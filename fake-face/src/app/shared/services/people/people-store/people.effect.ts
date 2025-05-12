import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PeopleService } from "../people.service";
import { catchError, concatMap, map, of } from "rxjs";
import * as PeopleActions from "./people.action";

@Injectable()
export class PeopleEffects{
    getAllUsers$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PeopleActions.GetAllUsers),
            concatMap((action) => this.peopleService.getAllUsers(action.data).pipe(
                map((data) => {
                    return PeopleActions.GetAllUsersSuccess({ data });
                }),
                catchError(() => of(PeopleActions.failure({ error: "Load GetAllUsers failure" })))
            )
            )
        );
    });

    sendFriendRequest$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PeopleActions.SendFriendRequest),
            concatMap((action) => this.peopleService.sendFriendRequest(action.data).pipe(
                map((data) => {
                    return PeopleActions.SendFriendRequestSuccess({ data });
                }),
                catchError(() => of(PeopleActions.failure({ error: "Load SendFriendRequest failure" })))
            )
            )
        );
    });

    acceptFriendRequest$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PeopleActions.AcceptFriendRequest),
            concatMap((action) => this.peopleService.acceptFriendRequest(action.data).pipe(
                map((data) => {
                    return PeopleActions.AcceptFriendRequestSuccess({ data });
                }),
                catchError(() => of(PeopleActions.failure({ error: "Load AcceptFriendRequest failure" })))
            )
            )
        );
    });

    rejectFriendRequest$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PeopleActions.RejectFriendRequest),
            concatMap((action) => this.peopleService.rejectFriendRequest(action.data).pipe(
                map((data) => {
                    return PeopleActions.RejectFriendRequestSuccess({ data });
                }),
                catchError(() => of(PeopleActions.failure({ error: "Load RejectFriendRequest failure" })))
            )
            )
        );
    });
    
    getFriendRequests$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PeopleActions.GetFriendRequests),
            concatMap((action) => this.peopleService.getFriendRequests(action.data).pipe(
                map((data) => {
                    return PeopleActions.GetFriendRequestsSuccess({ data });
                }),
                catchError(() => of(PeopleActions.failure({ error: "Load GetFriendRequests failure" })))
            )
            )
        );
    });

    constructor(
        private action$: Actions,
        private peopleService: PeopleService
    ) { }

}

