import { PostFeed } from "../../../models/post/post-feed.model";
import { Post } from "../../../models/post/post.model";
import { TokenModel } from "../../../models/token/token.model";

export const POST_FEATURE_KEY = 'POST';

export interface State{
    loaded:boolean;
    error?:string | null;
    data: null | number | TokenModel | boolean | string | PostFeed[];
}