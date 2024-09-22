export interface Message {
    message_id: number;
    sender_user_id: number;
    reciever_user_id: number;
    chatroom_id: number;
    content: string;
}