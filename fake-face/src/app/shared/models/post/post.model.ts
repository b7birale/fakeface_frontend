export interface Post {
    post_id: number;
    user_id: number;
    picture?: string;
    content: string;
    date: Date;
    title: string;
}