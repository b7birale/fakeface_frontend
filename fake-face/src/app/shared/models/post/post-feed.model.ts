import { SafeUrl } from "@angular/platform-browser";

export interface PostFeed {
    post_id: number;
    user_id: number;
    picture?: string;
    content: string;
    date: Date;
    title: string;
    firstname: string;
    lastname: string;
    pictureSafeUrl?: SafeUrl;
}