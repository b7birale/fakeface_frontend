import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../user.service";
import { catchError, concatMap, map, of } from "rxjs";
import * as UserActions from "../user-store/user.action";

@Injectable()
export class UserEffects{
    loadTokens$ = createEffect(() => {
        return this.action$.pipe(
            ofType(UserActions.Login),
            concatMap((action) => this.userService.login(action.data).pipe(
                map((data) => {
                    return UserActions.LoginSuccess({ data });
                }),
                catchError(() => of(UserActions.failure({ error: "Load tokens failure" })))
            )
            )
        );
    });
    
    signup$ = createEffect(() => {
        return this.action$.pipe(
            ofType(UserActions.SignUp),
            concatMap((action) => this.userService.signUp(action.data).pipe(
                map((data) => {
                    return UserActions.SignUpSuccess({ data });
                }),
                catchError(() => of(UserActions.failure({ error: "Load tokens failure" })))
            )
            )
        );
    });

    get_user_to_profile$ = createEffect(() => {
        return this.action$.pipe(
            ofType(UserActions.GetUserToProfile),
            concatMap((action) => this.userService.getUserToProfile(action.data).pipe(
                map((data) => {
                    return UserActions.GetUserToProfileSuccess({ data });
                }),
                catchError(() => of(UserActions.failure({ error: "Load getUserToProfile failure" })))
            )
            )
        );
    });


    constructor(
        private action$: Actions,
        private userService: UserService
    ) { }

}

