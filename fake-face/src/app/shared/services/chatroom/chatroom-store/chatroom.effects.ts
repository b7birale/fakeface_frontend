import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ChatroomService } from "../chatroom.service";
import { catchError, concatMap, map, of } from "rxjs";
import * as ChatroomActions from "./chatroom.action";

@Injectable()
export class ChatroomEffects{
    
    get_chatrooms_by_userid$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ChatroomActions.GetChatroomsByUserId),
            concatMap((action) => this.chatroomService.GetChatroomsByUserId(action.data).pipe(
                map((data) => {
                    return ChatroomActions.GetChatroomsByUserIdSuccess({ data });
                }),
                catchError(() => of(ChatroomActions.failure({ error: "Load get chatrooms failure" })))
            )
            )
        );
    });

    create_chatroom$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ChatroomActions.CreateChatroom),
            concatMap((action) => this.chatroomService.CreateChatroom(action.data).pipe(
                map((data) => {
                    return ChatroomActions.CreateChatroomSuccess({ data });
                }),
                catchError(() => of(ChatroomActions.failure({ error: "Load create chatroom failure" })))
            )
            )
        );
    });

    delete_chatroom$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ChatroomActions.DeleteChatroom),
            concatMap((action) => this.chatroomService.DeleteChatroom(action.data).pipe(
                map((data) => {
                    return ChatroomActions.DeleteChatroomSuccess({ data });
                }),
                catchError(() => of(ChatroomActions.failure({ error: "Load delete chatroom failure" })))
            )
            )
        );
    });


    constructor(
        private action$: Actions,
        private chatroomService: ChatroomService
    ) { }

}

