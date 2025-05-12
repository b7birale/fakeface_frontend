import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, USER_FEATURE_KEY } from "./user.state";

export const getUserSate = createFeatureSelector<State>(USER_FEATURE_KEY);

export const getUser = createSelector(
    getUserSate,
    (state:State) => state.data
)