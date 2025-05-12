import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, POST_FEATURE_KEY } from "./post.state";

export const getPostSate = createFeatureSelector<State>(POST_FEATURE_KEY);

export const getPost = createSelector(
    getPostSate,
    (state:State) => state.data
)