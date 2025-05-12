import { TokenModel } from "../../../models/token/token.model";
import { UserFriendModel } from "../../../models/user/user-friend.model";

export const FRIEND_FEATURE_KEY = 'FRIEND';

export interface State{
    loaded:boolean;
    error?:string | null;
    data: null | number | TokenModel | boolean | number[] | UserFriendModel[];
}