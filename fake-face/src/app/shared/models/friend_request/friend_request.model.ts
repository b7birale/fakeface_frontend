export interface FriendRequest {
    requestId: number;
    senderUserId: number;
    recieverUserId: number;
    accepted: boolean;
    rejected: boolean;
}