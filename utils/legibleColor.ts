type RGB = [number, number, number];

export default function getLegibleTextColor(backgroundColor: string): string {
  const rgb = parseColor(backgroundColor);
  if (!rgb) {
    return '#000000'; // Default to black if parsing fails
  }

  // Calculate relative luminance
  const luminance = calculateRelativeLuminance(...rgb);

  // Return black for light backgrounds and white for dark backgrounds
  return luminance > 0.179 ? '#000000' : '#FFFFFF';
}

function parseColor(color: string): RGB | null {
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    return [
      parseInt(rgbMatch[1]),
      parseInt(rgbMatch[2]),
      parseInt(rgbMatch[3])
    ];
  }

  // If it's not a recognized format, return null
  return null;
}

function calculateRelativeLuminance(r: number, g: number, b: number): number {
  const [rr, gg, bb] = [r, g, b].map(component => {
    const c = component / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
}