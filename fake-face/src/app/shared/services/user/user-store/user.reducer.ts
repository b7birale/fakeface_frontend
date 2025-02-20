import { Action, createReducer, on} from "@ngrx/store";
import { State } from "./user.state";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import * as UserActions from "../user-store/user.action";

export const TokenAdapter: EntityAdapter<string> =
    createEntityAdapter<string>();

export const initialState: State = ({
    loaded: false,
    data: null
});

const UserReducer = createReducer(
    initialState,
    on(UserActions.init, () =>
        ({ ...initialState })
    ),
    on(
        UserActions.LoginSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
    on(
        UserActions.SignUpSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
    on(
        UserActions.GetUserToProfileSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
)

export function reducer(state: State | undefined, aciton: Action){
    return UserReducer(state,aciton);
}