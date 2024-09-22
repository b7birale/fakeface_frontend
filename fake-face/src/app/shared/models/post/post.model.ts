export interface Post {
    post_id: number;
    user_id: number;
    picture?: string;
    text: string;
    date: Date;
    comments?: number; //???
}