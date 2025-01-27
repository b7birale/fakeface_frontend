import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FriendService } from "../friend.service";
import { catchError, concatMap, map, of } from "rxjs";
import * as FriendActions from "../friend-store/friend.action";

@Injectable()
export class FriendEffects{
    
    get_friends_by_userid$ = createEffect(() => {
        return this.action$.pipe(
            ofType(FriendActions.GetFriendsByUserId),
            concatMap((action) => this.friendService.GetFriendsByUserId(action.data).pipe(
                map((data) => {
                    return FriendActions.GetFriendsByUserIdSuccess({ data });
                }),
                catchError(() => of(FriendActions.failure({ error: "Load friends failure" })))
            )
            )
        );
    });


    constructor(
        private action$: Actions,
        private friendService: FriendService
    ) { }

}

