import { Message } from "../../../models/message/message.model";
import { TokenModel } from "../../../models/token/token.model";

export const MESSAGE_FEATURE_KEY = 'MESSAGE';

export interface State{
    loaded:boolean;
    error?:string | null;
    data: null | number | TokenModel | boolean | number[] | Message[];
}