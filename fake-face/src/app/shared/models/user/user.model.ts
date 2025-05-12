export interface User {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    userId: number;
    birthDate: Date;
    profilePicture?: string;
    qr_code?: string;
}