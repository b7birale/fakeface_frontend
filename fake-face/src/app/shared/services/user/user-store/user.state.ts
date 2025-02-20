import { TokenModel } from "../../../models/token/token.model";
import { User } from "../../../models/user/user.model";

export const USER_FEATURE_KEY = 'USER';

export interface State{
    loaded:boolean;
    error?:string | null;
    data: null | number | TokenModel | boolean | User;
}