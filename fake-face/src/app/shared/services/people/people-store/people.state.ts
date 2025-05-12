import { FriendRequest } from "../../../models/friend_request/friend_request.model";
import { NewFriendRequest } from "../../../models/friend_request/new_friend_request.model";
import { TokenModel } from "../../../models/token/token.model";
import { UserPerson } from "../../../models/user/user-person.model";
import { User } from "../../../models/user/user.model";

export const PEOPLE_FEATURE_KEY = 'PEOPLE';

export interface State{
    loaded:boolean;
    error?:string | null;
    data: null | number | TokenModel | boolean | UserPerson[] | User | NewFriendRequest[] | FriendRequest;
}