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
        const dominantHex = rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2])
        
        const legibleTextColor = getLegibleTextColor(`rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`)
        const legibleHex = rgbStringToHex(legibleTextColor)

        if (!legibleHex) {
            throw new Error('Failed to convert legible text color to hex')
        }

        return {
            color: dominantHex,
            textColor: legibleHex,
            colorRgb: `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`,
            textColorRgb: legibleTextColor
        }
    }
    catch (error: any) {
        console.error('Error extracting color:', error)

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        })
    }
})

function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (n: number): string => {
        const hex = Math.max(0, Math.min(255, n)).toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

function rgbStringToHex(rgbString: string): string | null {
    const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    if (!match) return null
    
    const r = parseInt(match[1])
    const g = parseInt(match[2])
    const b = parseInt(match[3])
    
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null
    return rgbToHex(r, g, b)
}