import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, PEOPLE_FEATURE_KEY as PEOPLE_FEATURE_KEY } from "./people.state";

export const getPeopleSate = createFeatureSelector<State>(PEOPLE_FEATURE_KEY);

export const getPeople = createSelector(
    getPeopleSate,
    (state:State) => state.data
)