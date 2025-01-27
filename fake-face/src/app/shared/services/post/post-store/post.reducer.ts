import { Action, createReducer, on} from "@ngrx/store";
import { State } from "./post.state";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import * as PostActions from "./post.action";

export const TokenAdapter: EntityAdapter<string> =
    createEntityAdapter<string>();

export const initialState: State = ({
    loaded: false,
    data: null
});

const PostReducer = createReducer(
    initialState,
    on(PostActions.init, () =>
        ({ ...initialState })
    ),
    on(
        PostActions.GetPostsByUserIdsSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
    on(
        PostActions.CreatePostSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
)

export function reducer(state: State | undefined, aciton: Action){
    return PostReducer(state,aciton);
}