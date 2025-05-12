import { FeedComment } from "../../../models/comment/comment.feed.model";
import { TokenModel } from "../../../models/token/token.model";

export const COMMENT_FEATURE_KEY = 'COMMENT';

export interface State{
    loaded:boolean;
    error?:string | null;
    data: null | number | TokenModel | boolean | number[] | FeedComment[];
}