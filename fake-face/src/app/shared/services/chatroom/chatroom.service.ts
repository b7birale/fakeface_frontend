import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Chatroom } from "../../models/chatroom/chatroom.model";

@Injectable({
    providedIn: 'root',
  })
  export class ChatroomService {
    private apiUrl = 'https://localhost:7258/api/chatrooms';
  
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) {}
  
    GetChatroomsByUserId(user_id: number): Observable<Chatroom[]> {
      let url = this.apiUrl + "/GetChatrooms";
      let queryParam = new HttpParams().set('user_id', user_id.toString());
      console.log(queryParam);
      return this.http.get<Chatroom[]>(url, {params: queryParam}
      )
        .pipe(catchError(this.handleError<Chatroom[]>('GetChatrooms', [])));
    }

    CreateChatroom(name: string): Observable<boolean> {
      let url = this.apiUrl + "/CreateChatroom";
      let queryParam = new HttpParams().set('name', name);
      console.log(queryParam);
      return this.http.get<boolean>(url, {params: queryParam}
      )
        .pipe(catchError(this.handleError<boolean>('CreateChatroom', false)));
    }
    
    DeleteChatroom(chatroom_id: number): Observable<boolean> {
      let url = this.apiUrl + "/DeleteChatroom";
      let queryParam = new HttpParams().set('chatroom_id', chatroom_id.toString());
      console.log(queryParam);
      return this.http.get<boolean>(url, {params: queryParam}
      )
        .pipe(catchError(this.handleError<boolean>('DeleteChatroom', false)));
    }

    // Error handling method
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        return of(result as T);
      };
    }
  }
