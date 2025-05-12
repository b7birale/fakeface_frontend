import { createAction, props } from "@ngrx/store";
import { ChatroomModel } from "../../../models/chatroom/chatroom.model";

export const init = createAction(
    '[Chatrooms/API] Load Chatrooms Init',
    props<{ id: number }>()
);

export const failure = createAction(
    '[Chatrooms/API] Load Chatrooms Failure',
    props<{ error: any }>()
);

export const GetChatroomsByUserId = createAction(
    '[Chatrooms/API] Load GetChatroomsByUserId',
    props<{data: number }>()
);

export const GetChatroomsByUserIdSuccess = createAction(
    '[Chatrooms/API] Load GetChatroomsByUserId Success',
    props<{ data: ChatroomModel[] }>()
);

export const CreateChatroom = createAction(
    '[Chatrooms/API] Load CreateChatroom',
    props<{data: ChatroomModel }>()
);

export const CreateChatroomSuccess = createAction(
    '[Chatrooms/API]  Load CreateChatroom Success',
    props<{ data: number }>()
);

export const DeleteChatroom = createAction(
    '[Chatrooms/API] Load DeleteChatroom',
    props<{data: number }>()
);

export const DeleteChatroomSuccess = createAction(
    '[Chatrooms/API]  Load DeleteChatroom Success',
    props<{ data: boolean }>()
);
