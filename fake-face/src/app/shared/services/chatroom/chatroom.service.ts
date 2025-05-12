import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { ChatroomModel } from "../../models/chatroom/chatroom.model";

@Injectable({
    providedIn: 'root',
  })
  export class ChatroomService {
    private apiUrl = 'https://localhost:7258/api/chatrooms';
  
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) {}
  
    GetChatroomsByUserId(user_id: number): Observable<ChatroomModel[]> {
      let url = this.apiUrl + "/get-chatrooms";
      let queryParam = new HttpParams().set('user_id', user_id.toString());
      console.log(queryParam);
      return this.http.get<ChatroomModel[]>(url, {params: queryParam}
      )
        .pipe(catchError(this.handleError<ChatroomModel[]>('GetChatrooms', [])));
    }

    CreateChatroom(dto: ChatroomModel): Observable<number> {
      let url = this.apiUrl + "/create-chatroom";
      return this.http.post<number>(url, dto
      )
        .pipe(catchError(this.handleError<number>('CreateChatroom', 0)));
    }
    
    DeleteChatroom(chatroom_id: number): Observable<boolean> {
      let url = this.apiUrl + "/celete-chatroom";
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
