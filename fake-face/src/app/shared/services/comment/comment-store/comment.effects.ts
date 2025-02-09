import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CommentService } from "../comment.service";
import { catchError, concatMap, map, of } from "rxjs";
import * as CommentActions from "../comment-store/comment.action";

@Injectable()
export class CommentEffects{
    
    get_comments_by_postid$ = createEffect(() => {
        return this.action$.pipe(
            ofType(CommentActions.GetCommentsByPostId),
            concatMap((action) => this.commentService.GetCommentsByPostId(action.data).pipe(
                map((data) => {
                    return CommentActions.GetCommentsByPostIdSuccess({ data });
                }),
                catchError(() => of(CommentActions.failure({ error: "Load comments failure" })))
            )
            )
        );
    });


    constructor(
        private action$: Actions,
        private commentService: CommentService
    ) { }

}

