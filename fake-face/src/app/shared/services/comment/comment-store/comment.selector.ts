import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, COMMENT_FEATURE_KEY } from "./comment.state";

export const getCommentSate = createFeatureSelector<State>(COMMENT_FEATURE_KEY);

export const getComment = createSelector(
    getCommentSate,
    (state:State) => state.data
)