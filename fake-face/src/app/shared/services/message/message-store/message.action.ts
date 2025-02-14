import { createAction, props } from "@ngrx/store";
import { Message } from "../../../models/message/message.model";

export const init = createAction(
    '[Messages/API] Load Messages Init',
    props<{ id: number }>()
);

export const failure = createAction(
    '[Messages/API] Load Messages Failure',
    props<{ error: any }>()
);

export const GetMessagesByChatroomId = createAction(
    '[Messages/API] Load GetMessagesByChatroomId',
    props<{data: number }>()
);

export const GetMessagesByChatroomIdSuccess = createAction(
    '[Messages/API] Load GetMessagesByChatroomId Success',
    props<{ data: Message[] }>()
);

export const SendMessage = createAction(
    '[Messages/API] Load SendMessage',
    props<{data: number; text: string}>()
);

export const SendMessageSuccess = createAction(
    '[Messages/API]  Load SendMessage Success',
    props<{ data: boolean }>()
);

export const DeleteMessage = createAction(
    '[Messages/API] Load DeleteMessage',
    props<{data: number }>()
);

export const DeleteMessageSuccess = createAction(
    '[Comments/API]  Load DeleteMessageSuccess',
    props<{ data: boolean }>()
);
