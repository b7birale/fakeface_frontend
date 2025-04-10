import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PeopleService } from "../people.service";
import { catchError, concatMap, map, of } from "rxjs";
import * as PeopleActions from "./people.action";

@Injectable()
export class PeopleEffects{
    getAllUsers$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PeopleActions.GellAllUsers),
            concatMap((action) => this.peopleService.getAllUsers(action.data).pipe(
                map((data) => {
                    return PeopleActions.GellAllUsersSuccess({ data });
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
    

    constructor(
        private action$: Actions,
        private peopleService: PeopleService
    ) { }

}

