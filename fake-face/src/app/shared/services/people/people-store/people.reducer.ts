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
        PeopleActions.GellAllUsersSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
)

export function reducer(state: State | undefined, aciton: Action){
    return PeopleReducer(state,aciton);
}