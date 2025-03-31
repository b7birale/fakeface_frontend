export interface UpdateUser {
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    userId: number;
    birthDate?: Date;
    profilePicture?: string;
}