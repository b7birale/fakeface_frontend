import { Action, createReducer, on} from "@ngrx/store";
import { State } from "./friend.state";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import * as FriendActions from "../friend-store/friend.action";

export const TokenAdapter: EntityAdapter<string> =
    createEntityAdapter<string>();

export const initialState: State = ({
    loaded: false,
    data: null
});

const FriendReducer = createReducer(
    initialState,
    on(FriendActions.init, () =>
        ({ ...initialState })
    ),
    on(
        FriendActions.GetFriendsByUserIdSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
)

export function reducer(state: State | undefined, aciton: Action){
    return FriendReducer(state,aciton);
}