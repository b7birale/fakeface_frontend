import { SafeUrl } from "@angular/platform-browser";

export interface UserFriendModel {
    userId?: number;
    firstname: string;
    lastname: string;
    profilePicture?: string;
    pictureSafeUrl?: SafeUrl;
}
