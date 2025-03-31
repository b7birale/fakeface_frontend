import { SafeUrl } from "@angular/platform-browser"

export interface UserPerson{
    firstname: string
    lastname: string
    profilePicture?: string 
    pictureSafeUrl?: SafeUrl
}
    