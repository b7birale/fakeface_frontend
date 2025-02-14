import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, MESSAGE_FEATURE_KEY } from "./message.state";

export const getMessageSate = createFeatureSelector<State>(MESSAGE_FEATURE_KEY);

export const getMessage = createSelector(
    getMessageSate,
    (state:State) => state.data
)