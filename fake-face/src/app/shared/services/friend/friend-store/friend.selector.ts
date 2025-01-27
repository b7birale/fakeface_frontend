import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, FRIEND_FEATURE_KEY } from "./friend.state";

export const getFriendSate = createFeatureSelector<State>(FRIEND_FEATURE_KEY);

export const getFriend = createSelector(
    getFriendSate,
    (state:State) => state.data
)