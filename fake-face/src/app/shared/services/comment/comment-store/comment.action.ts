import { createAction, props } from "@ngrx/store";
import { FeedComment } from "../../../models/comment/comment.feed.model";

export const init = createAction(
    '[Comments/API] Load Comments Init',
    props<{ id: number }>()
);

export const failure = createAction(
    '[Comments/API] Load Comments Failure',
    props<{ error: any }>()
);

export const GetCommentsByPostId = createAction(
    '[Comments/API] Load GetCommentsByPostId',
    props<{data: number }>()
);

export const GetCommentsByPostIdSuccess = createAction(
    '[Comments/API] Load GetCommentsByPostId Success',
    props<{ data: FeedComment[] }>()
);
