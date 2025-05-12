import { createAction, props } from "@ngrx/store";
import { UserFriendModel } from "../../../models/user/user-friend.model";

export const init = createAction(
    '[Friend/API] Load Friend Init',
    props<{ id: number }>()
);

export const failure = createAction(
    '[Friend/API] Load Friend Failure',
    props<{ error: any }>()
);

export const GetFriendsIdsByUserId = createAction(
    '[Friend/API] Load GetFriendsIdsByUserId',
    props<{data: string }>()
);

export const GetFriendsIdsByUserIdSuccess = createAction(
    '[Friend/API] Load GetFriendsIdsByUserId Success',
    props<{ data: number[] }>()
);


export const GetFriendsByUserId = createAction(
    '[Friend/API] Load GetFriendsByUserId',
    props<{data: string }>()
);

export const GetFriendsByUserIdSuccess = createAction(
    '[Friend/API] Load GetFriendsByUserId Success',
    props<{ data: UserFriendModel[] }>()
);

export const AddFriend = createAction(
    '[Friend/API] Load AddFriend',
    props<{data: string }>()
);

export const AddFriendSuccess = createAction(
    '[Friend/API] Load AddFriend Success',
    props<{ data: boolean }>()
);

