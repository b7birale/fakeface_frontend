import { TokenModel } from "../../../models/token/token.model";
import { UserPerson } from "../../../models/user/user-person.model";
import { User } from "../../../models/user/user.model";

export const PEOPLE_FEATURE_KEY = 'PEOPLE';

export interface State{
    loaded:boolean;
    error?:string | null;
    data: null | number | TokenModel | boolean | UserPerson[] | User;
}