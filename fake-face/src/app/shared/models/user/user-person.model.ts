import { SafeUrl } from "@angular/platform-browser"

export interface UserPerson{
    userId: number
    firstname: string
    lastname: string
    profilePicture?: string 
    pictureSafeUrl?: SafeUrl
}
    