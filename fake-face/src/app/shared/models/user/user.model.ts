export interface User {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    user_id: number;
    birth_date: Date;
    profile_picture?: string;
    qr_code?: string;
}