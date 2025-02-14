import { Chatroom } from "../../../models/chatroom/chatroom.model";
import { TokenModel } from "../../../models/token/token.model";

export const CHATROOM_FEATURE_KEY = 'CHATROOM';

export interface State{
    loaded:boolean;
    error?:string | null;
    data: null | number | TokenModel | boolean | number[] | Chatroom[];
}