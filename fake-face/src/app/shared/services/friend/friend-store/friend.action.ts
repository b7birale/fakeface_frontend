import { createAction, props } from "@ngrx/store";

export const init = createAction(
    '[Friend/API] Load Friend Init',
    props<{ id: number }>()
);

export const failure = createAction(
    '[Friend/API] Load Friend Failure',
    props<{ error: any }>()
);

export const GetFriendsByUserId = createAction(
    '[Friend/API] Load GetFriendsByUserId',
    props<{data: string }>()
);

export const GetFriendsByUserIdSuccess = createAction(
    '[Friend/API] Load GetFriendsByUserId Success',
    props<{ data: number[] }>()
);
