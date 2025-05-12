import { Action, createReducer, on} from "@ngrx/store";
import { State } from "./comment.state";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import * as CommentActions from "../comment-store/comment.action";

export const TokenAdapter: EntityAdapter<string> =
    createEntityAdapter<string>();

export const initialState: State = ({
    loaded: false,
    data: null
});

const CommentReducer = createReducer(
    initialState,
    on(CommentActions.init, () =>
        ({ ...initialState })
    ),
    on(
        CommentActions.GetCommentsByPostIdSuccess, (state, { data }) => ({
            ...state,
            data: data,
            loaded: true
        })
    ),
)

export function reducer(state: State | undefined, aciton: Action){
    return CommentReducer(state,aciton);
}