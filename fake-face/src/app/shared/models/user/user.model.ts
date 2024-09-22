export interface User {
    email: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    }
    user_id: number;
    birth_date: Date;
    profile_picture?: string;
    qr_code?: string;
}