import { SafeUrl } from "@angular/platform-browser";

export interface NewFriendRequest {
    senderUserId: number;
    recieverUserId: number;
    firstname: string;
    lastname: string;
    profilePicture?: string;
    pictureSafeUrl?: SafeUrl;
}