import { defineEventHandler } from 'h3'
import { getColorFromURL } from 'color-thief-node'
import getLegibleTextColor from './../../../utils/legibleColor'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const imageUrl = body.imageUrl

        if (!imageUrl) {
            throw new Error('No image URL provided')
        }

        const dominantColor = await getColorFromURL(imageUrl)
        const legibleTextColor = getLegibleTextColor(`rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`)

        return {
            success: true,
            color: `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`,
            textColor: legibleTextColor
        }
    }
    catch (error: any) {
        console.error('Error extracting color:', error)
        return {
            success: false,
            error: error.message
        }
    }
})