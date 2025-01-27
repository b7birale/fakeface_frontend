import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "../post.service";
import { catchError, concatMap, map, of } from "rxjs";
import * as PostActions from "./post.action";

@Injectable()
export class PostEffects{
    
    get_posts_by_userids$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PostActions.GetPostsByUserIds),
            concatMap((action) => this.postService.getPostsByUserIds(action.data).pipe(
                map((data) => {
                    return PostActions.GetPostsByUserIdsSuccess({ data });
                }),
                catchError(() => of(PostActions.failure({ error: "Load posts failure" })))
            )
            )
        );
    });

    create_post$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PostActions.CreatePost),
            concatMap((action) => this.postService.createPost(action.data).pipe(
                map((data) => {
                    return PostActions.CreatePostSuccess({ data });
                }),
                catchError(() => of(PostActions.failure({ error: "Create post failure" })))
            )
            )
        );
    });


    constructor(
        private action$: Actions,
        private postService: PostService
    ) { }

}

