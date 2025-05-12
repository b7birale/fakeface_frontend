import { Action, createReducer, on} from "@ngrx/store";
import { State } from "./people.state";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import * as PeopleActions from "./people.action";

export const TokenAdapter: EntityAdapter<string> =
    createEntityAdapter<string>();

export const initialState: State = ({
    loaded: false,
    data: null
});

const PeopleReducer = createReducer(
    initialState,
    on(PeopleActions.init, () =>
        ({ ...initialState })
    ),
    on(
        PeopleActions.GetAllUsersSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
    on(
        PeopleActions.SendFriendRequestSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
    on(
        PeopleActions.AcceptFriendRequestSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
    on(
        PeopleActions.RejectFriendRequestSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
    on(
        PeopleActions.GetFriendRequestsSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
)

export function reducer(state: State | undefined, aciton: Action){
    return PeopleReducer(state,aciton);
}