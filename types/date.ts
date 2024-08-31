export const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

export interface DeconstructedDate {
    year_number: number;
    year_string: string;
    month_number: number;
    month_string: string;
    day_number: number;
    day_string: string;
}