import { createAction, props } from "@ngrx/store";
import { TokenModel } from "../../../models/token/token.model";
import { LoginUser } from "../../../models/login_user/login_user.model";
import { User } from "../../../models/user/user.model";
import { UpdateUser } from "../../../models/user/user-update.model";

export const init = createAction(
    '[User/API] Load User',
    props<{ id: number }>()
);

export const failure = createAction(
    '[User/API] Load User Failure',
    props<{ error: any }>()
);

export const Login = createAction(
    '[Token/API] Load Token',
    props<{data: LoginUser }>()
);

export const LoginSuccess = createAction(
    '[Token/API] Load Token Success',
    props<{ data: TokenModel }>()
);

export const SignUp = createAction(
    '[Token/API] Load SignUp',
    props<{data: User }>()
);

export const SignUpSuccess = createAction(
    '[Token/API] Load Token SignUp Success',
    props<{ data: boolean }>()
);

export const GetUserToProfile = createAction(
    '[Token/API] Load getUserToProfile',
    props<{data: number }>()
);

export const GetUserToProfileSuccess = createAction(
    '[Token/API] Load Token getUserToProfile Success',
    props<{ data: User }>()
);

export const ModifyUserData = createAction(
    '[Token/API] Load ModifyUserData',
    props<{data: UpdateUser }>()
);

export const ModifyUserDataSuccess = createAction(
    '[Token/API] Load Token ModifyUserData Success',
    props<{ data: boolean }>()
);
