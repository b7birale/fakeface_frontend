export interface JwtDecodeModel{
    Kind?: string;
    ID?: string;
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
}