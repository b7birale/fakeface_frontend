import { Action, createReducer, on} from "@ngrx/store";
import { State } from "./chatroom.state";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import * as ChatroomActions from "../chatroom-store/chatroom.action";

export const TokenAdapter: EntityAdapter<string> =
    createEntityAdapter<string>();

export const initialState: State = ({
    loaded: false,
    data: null
});

const ChatroomReducer = createReducer(
    initialState,
    on(ChatroomActions.init, () =>
        ({ ...initialState })
    ),
    on(
        ChatroomActions.GetChatroomsByUserIdSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
    on(
        ChatroomActions.CreateChatroomSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
    on(
        ChatroomActions.DeleteChatroomSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
)

export function reducer(state: State | undefined, aciton: Action){
    return ChatroomReducer(state,aciton);
}