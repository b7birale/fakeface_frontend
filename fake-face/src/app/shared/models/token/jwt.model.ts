export interface JwtDecodeModel{
    Kind?: string;
    Id?: string;
    RefreshToken?: string;
    Registered?: string;
    alg?: string;
    aud?: string;
    exp: number;
    RoleId?: string;
    Email?: string;
    FID?: string;
    iss?: string;
    nbf?: number;
    typ?: string;
    ProfilePicture: string;
    Firstname: string;
    Lastname: string;
}