export interface Comment {
    comment_id: number;
    post_id: number;
    user_id: number;
    content: string;
    date: Date;
}

export interface AddCommentModel {
    postId: number;
    userId: number;
    content: string;
}