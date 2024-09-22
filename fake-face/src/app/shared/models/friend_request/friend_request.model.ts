export interface FriendRequest {
    request_id: number;
    sender_user_id: number;
    reciever_user_id: number;
    accepted: boolean;
    rejected: boolean;
}