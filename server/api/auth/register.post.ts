import { type User } from '~/models/user';
//@ts-ignore
import bcrypt from 'bcrypt';
import { PostgresUtil } from '~/server/utils/postgres';
import { validator } from '~/utils/validator';
import { type ValidationResult } from '~/types/validation';

interface RegisterInput {
    email: string
    password: string
    firstName: string
    lastName: string
    userType: number
}

interface ValidationResponse {
    isValid: boolean
    error?: string
    sanitizedData?: Partial<RegisterInput>
}

export default defineEventHandler(async (event) => {
    try {
        setResponseStatus(event, 500)
        return { 
            statusCode: 500,
            body: { message: 'Registering disabled' }
        };

        const input = await readBody(event)
        const validation = validateInput(input)
        
        if (!validation.isValid) {
            return {
                status: 400,
                body: { message: validation.error }
            }
        }
    
        const { email, password, firstName, lastName, userType } = validation.sanitizedData!

        console.log('Registering user:', email, firstName, lastName, userType)
        const db = PostgresUtil.getInstance()
    
        return await db.transaction(async (client) => {
            if (!email || email === '' || email === undefined) {
                return {
                    status: 400,
                    body: { message: 'Email is required' }
                }
            }

            const existingUsers = await client.query(
                'SELECT email FROM private.users WHERE email = $1',
                [email.toLowerCase()]
            )
        
            if (existingUsers.rows.length > 0) {
                return {
                    status: 400,
                    body: { message: 'Email already registered' }
                }
            }
        
            // Verify user type exists
            const userTypes = await client.query(
                'SELECT user_type_id FROM private.user_types WHERE user_type_id = $1',
                [userType]
            )
        
            if (userTypes.rows.length === 0) {
                return {
                    status: 400,
                    body: { message: 'Invalid user type' }
                }
            }
        
            // Hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
        
            // Insert new user
            await client.query(
                `INSERT INTO private.users (
                        user_type_id,
                        email,
                        password,
                        first_name,
                        last_name
                    ) VALUES ($1, $2, $3, $4, $5)`
                ,
                [
                    userType,
                    email,
                    hashedPassword,
                    firstName,
                    lastName
                ]
            )
        
            return {
                status: 201,
                body: {
                    message: 'Registration successful',
                    data: {
                        email,
                        firstName,
                        lastName,
                        userType
                    }
                }
            } 
        })
    } 
    catch (error) {
        console.error('Register error:', error)
        return {
            status: 500,
            body: { 
                message: 'An error occurred while registering. Please try again.' 
            }
        }
    }
});

function validateInput(input: Partial<RegisterInput>): ValidationResponse {
    const validations: { [key: string]: ValidationResult } = {
        firstName: validator.validateField(
            validator.sanitiseDoubleSpaces(input.firstName || ''),
            50
        ),
        lastName: validator.validateField(
            validator.sanitiseDoubleSpaces(input.lastName || ''),
            50
        ),
        email: validator.validateField(
            validator.sanitiseAllSpaces(input.email || ''),
            255
        ),
        password: validator.validateField(input.password || '', 255)
    }
  
    // Check validation results
    for (const [field, result] of Object.entries(validations)) {
        if (!result.isValid) {
            return {
            isValid: false,
            error: `${field}: ${result.error}`
            }
        }
    }
  
    // Validate email format separately since it's not covered by the validator
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(validations.email.value)) {
        return {
            isValid: false,
            error: 'Invalid email format'
        }
    }
  
    // Validate user type
    if (!input.userType || typeof input.userType !== 'number') {
        return {
            isValid: false,
            error: 'User type is required and must be a number'
        }
    }
  
    // Return sanitized data along with validation result
    return {
        isValid: true,
        sanitizedData: {
            firstName: validations.firstName.value,
            lastName: validations.lastName.value,
            email: validations.email.value,
            password: validations.password.value,
            userType: input.userType
        }
    }
}