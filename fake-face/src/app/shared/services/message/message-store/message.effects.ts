import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessageService } from "../message.service";
import { catchError, concatMap, map, of } from "rxjs";
import * as MessageActions from "./message.action";

@Injectable()
export class MessageEffects{
    
    get_messages_by_chatroomid$ = createEffect(() => {
        return this.action$.pipe(
            ofType(MessageActions.GetMessagesByChatroomId),
            concatMap((action) => this.messageService.GetMessagesByChatroomId(action.data).pipe(
                map((data) => {
                    return MessageActions.GetMessagesByChatroomIdSuccess({ data });
                }),
                catchError(() => of(MessageActions.failure({ error: "Load get messages failure" })))
            )
            )
        );
    });

    send_message$ = createEffect(() => {
        return this.action$.pipe(
            ofType(MessageActions.SendMessage),
            concatMap((action) => this.messageService.SendMessage(action.data).pipe(
                map((data) => {
                    return MessageActions.SendMessageSuccess({ data });
                }),
                catchError(() => of(MessageActions.failure({ error: "Load send message failure" })))
            )
            )
        );
    });

    delete_chatroom$ = createEffect(() => {
        return this.action$.pipe(
            ofType(MessageActions.DeleteMessage),
            concatMap((action) => this.messageService.DeleteMessage(action.data).pipe(
                map((data) => {
                    return MessageActions.DeleteMessageSuccess({ data });
                }),
                catchError(() => of(MessageActions.failure({ error: "Load delete chatroom failure" })))
            )
            )
        );
    });


    constructor(
        private action$: Actions,
        private messageService: MessageService
    ) { }

}

