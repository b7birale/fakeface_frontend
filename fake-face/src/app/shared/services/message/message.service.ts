import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Message } from "../../models/message/message.model";

@Injectable({
    providedIn: 'root',
  })
  export class MessageService {
    private apiUrl = 'https://localhost:7258/api/messages';
  
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) {}
  
    GetMessagesByChatroomId(chatroom_id: number): Observable<Message[]> {
      let url = this.apiUrl + "/get-messages";
      let queryParam = new HttpParams().set('chatroom_id', chatroom_id.toString());
      console.log(queryParam);
      return this.http.get<Message[]>(url, {params: queryParam}
      )
        .pipe(catchError(this.handleError<Message[]>('GetMessages', [])));
    }

    SendMessage(message: Message): Observable<boolean> {
      let url = this.apiUrl + "/send-message";
      return this.http.post<boolean>(url, message
      )
        .pipe(catchError(this.handleError<boolean>('SendMessage', false)));
    }
    
    DeleteMessage(message_id: number): Observable<boolean> {
      let url = this.apiUrl + "/delete-message";
      let queryParam = new HttpParams().set('message_id', message_id.toString());
      console.log(queryParam);
      return this.http.get<boolean>(url, {params: queryParam}
      )
        .pipe(catchError(this.handleError<boolean>('DeleteMessage', false)));
    }

    // Error handling method
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        return of(result as T);
      };
    }
  }
