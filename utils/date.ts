import { monthNames, type DeconstructedDate } from '../types/date';

export function formatDateDDMMYYY(isoString: string): string | null {
    try {
        const date = new Date(isoString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getUTCFullYear();

        return `${day}/${month}/${year}`;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export function formatFromDDMMYYYYToISO(date: string): string {
    const [day, month, year] = date.split('/').map(Number);
    return new Date(Date.UTC(year, month - 1, day)).toISOString();
}

export function getDeconstructedDate(isoString: string): DeconstructedDate {
    const date = new Date(isoString);

    const year_number = date.getUTCFullYear();
    const month_number = date.getUTCMonth() + 1; // getUTCMonth() returns 0-11
    const day_number = date.getUTCDate();
  
    return {
        year_number,
        year_string: year_number.toString(),
        month_number,
        month_string: monthNames[month_number - 1],
        day_number,
        day_string: day_number.toString().padStart(2, '0')
    };
}