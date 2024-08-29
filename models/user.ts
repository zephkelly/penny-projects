export enum UserType {
    Owner = 1,
    Administrator = 2,
    Moderator = 3,
    User = 4,
}
  
export interface User {
    UserId: number;
    CreatedDate: Date;
    UpdatedDate: Date;
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    UserType: UserType;
}
  