import { createAction, props } from "@ngrx/store";
import { TokenModel } from "../../../models/token/token.model";
import { LoginUser } from "../../../models/login_user/login_user.model";
import { User } from "../../../models/user/user.model";
import { UpdateUser } from "../../../models/user/user-update.model";
import { UserPerson } from "../../../models/user/user-person.model";

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

