import { TokenModel } from "../../../models/token/token.model";
import { UpdateUser } from "../../../models/user/user-update.model";
import { User } from "../../../models/user/user.model";

export const USER_FEATURE_KEY = 'USER';

export interface State{
    loaded:boolean;
    error?:string | null;
    data: null | number | TokenModel | boolean | UpdateUser | User;
}