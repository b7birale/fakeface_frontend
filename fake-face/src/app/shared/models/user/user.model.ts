export interface User {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    user_id: number;
    birthDate: Date;
    profile_picture?: string;
    qr_code?: string;
}