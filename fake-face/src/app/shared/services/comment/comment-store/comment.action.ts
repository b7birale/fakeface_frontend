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

export const AddComment= createAction(
    '[Comments/API] Load AddComment',
    props<{data: number }>()
);

export const AddCommentSuccess = createAction(
    '[Comments/API]  Load AddComment Success',
    props<{ data: boolean }>()
);

export const DeleteComment= createAction(
    '[Comments/API] Load DeleteComment',
    props<{data: number }>()
);

export const DeleteCommentSuccess = createAction(
    '[Comments/API]  Load DeleteComment Success',
    props<{ data: boolean }>()
);
