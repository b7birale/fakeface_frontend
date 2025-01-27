import { createAction, props } from "@ngrx/store";
import { Post } from "../../../models/post/post.model";
import { PostFeed } from "../../../models/post/post-feed.model";

export const init = createAction(
    '[Post/API] Load Post Init',
    props<{ id: number }>()
);

export const failure = createAction(
    '[Post/API] Load Post Failure',
    props<{ error: any }>()
);

export const GetPostsByUserIds = createAction(
    '[Post/API] Get Posts By UserIds',
    props<{data: string }>()
);

export const GetPostsByUserIdsSuccess = createAction(
    '[Post/API] Get Posts By UserIds Success',
    props<{ data: PostFeed[] }>()
);

export const CreatePost = createAction(
    '[Post/API] Create Post',
    props<{data: Post }>()
);

export const CreatePostSuccess = createAction(
    '[Post/API] Create Post Success',
    props<{ data: boolean }>()
);
