import { Action, createReducer, on} from "@ngrx/store";
import { State } from "./message.state";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import * as MessageActions from "./message.action";

export const TokenAdapter: EntityAdapter<string> =
    createEntityAdapter<string>();

export const initialState: State = ({
    loaded: false,
    data: null
});

const MessageReducer = createReducer(
    initialState,
    on(MessageActions.init, () =>
        ({ ...initialState })
    ),
    on(
        MessageActions.GetMessagesByChatroomIdSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
    on(
        MessageActions.SendMessageSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
    on(
        MessageActions.DeleteMessageSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
)

export function reducer(state: State | undefined, aciton: Action){
    return MessageReducer(state,aciton);
}