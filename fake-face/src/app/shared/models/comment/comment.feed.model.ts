import { SafeUrl } from "@angular/platform-browser";

export interface FeedComment {
    commentId: number;
    postId: number;
    userId: number;
    content: string;
    date: Date;
    firstName: string;
    lastName: string;
    profilePicture: string;
    profilePictureSafeUrl?: SafeUrl;
}