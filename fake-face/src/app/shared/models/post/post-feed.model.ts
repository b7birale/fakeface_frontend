import { SafeUrl } from "@angular/platform-browser";

export interface PostFeed {
    postId: number;
    userId: number;
    picture?: string;
    profilePicture?: string;
    content: string;
    date: Date;
    title: string;
    firstname: string;
    lastname: string;
    pictureSafeUrl?: SafeUrl;
}