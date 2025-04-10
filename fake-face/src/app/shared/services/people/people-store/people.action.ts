import { createAction, props } from "@ngrx/store";
import { TokenModel } from "../../../models/token/token.model";
import { LoginUser } from "../../../models/login_user/login_user.model";
import { User } from "../../../models/user/user.model";
import { UpdateUser } from "../../../models/user/user-update.model";
import { UserPerson } from "../../../models/user/user-person.model";
import { NewFriendRequest } from "../../../models/friend_request/new_friend_request.model";

export const init = createAction(
    '[People/API] Load People',
    props<{ id: number }>()
);

export const failure = createAction(
    '[People/API] Load People Failure',
    props<{ error: any }>()
);

export const GellAllUsers = createAction(
    '[People/API] Load GetAllUsers',
    props<{data: string }>()
);

export const GellAllUsersSuccess = createAction(
    '[People/API] Load GetAllUsers Success',
    props<{ data: UserPerson[] }>()
);

export const SendFriendRequest = createAction(
    '[People/API] Load SendFriendRequest',
    props<{data: NewFriendRequest }>()
);

export const SendFriendRequestSuccess = createAction(
    '[People/API] Load SendFriendRequest Success',
    props<{ data: boolean }>()
);
