export interface Message {
    messageId: number;
    senderUserId: number;
    recieverUserId: number;
    chatroomId: number;
    content: string;
    messageDatetime: Date;
}