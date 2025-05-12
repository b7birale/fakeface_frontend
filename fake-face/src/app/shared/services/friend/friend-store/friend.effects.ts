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

    get_friends_ids_by_userid$ = createEffect(() => {
        return this.action$.pipe(
            ofType(FriendActions.GetFriendsIdsByUserId),
            concatMap((action) => this.friendService.GetFriendsIdsByUserId(action.data).pipe(
                map((data) => {
                    return FriendActions.GetFriendsIdsByUserIdSuccess({ data });
                }),
                catchError(() => of(FriendActions.failure({ error: "Load friends ids failure" })))
            )
            )
        );
    });

    add_friend$ = createEffect(() => {
        return this.action$.pipe(
            ofType(FriendActions.AddFriend),
            concatMap((action) => this.friendService.AddFriend(action.data).pipe(
                map((data) => {
                    return FriendActions.AddFriendSuccess({ data });
                }),
                catchError(() => of(FriendActions.failure({ error: "Load add friend failure" })))
            )
            )
        );
    });


    constructor(
        private action$: Actions,
        private friendService: FriendService
    ) { }

}

