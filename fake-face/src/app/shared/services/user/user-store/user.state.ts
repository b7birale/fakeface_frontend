import { TokenModel } from "../../../models/token/token.model";

export const USER_FEATURE_KEY = 'USER';

export interface State{
    loaded:boolean;
    error?:string | null;
    data: null | number | TokenModel | boolean;
}