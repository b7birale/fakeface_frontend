import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, CHATROOM_FEATURE_KEY } from "./chatroom.state";

export const getChatroomSate = createFeatureSelector<State>(CHATROOM_FEATURE_KEY);

export const getChatroom = createSelector(
    getChatroomSate,
    (state:State) => state.data
)