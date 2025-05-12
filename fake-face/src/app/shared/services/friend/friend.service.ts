import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { UserFriendModel } from "../../models/user/user-friend.model";

@Injectable({
    providedIn: 'root',
  })
  export class FriendService {
    private apiUrl = 'https://localhost:7258/api/friend';
  
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) {}
  
    GetFriendsIdsByUserId(userId: string): Observable<number[]> {
      let url = this.apiUrl + "/GetFriendsIds";
      let queryParam = new HttpParams().set('userId', userId.toString());
      console.log(queryParam);
      return this.http.get<number[]>(url, {params: queryParam}
      )
        .pipe(catchError(this.handleError<number[]>('GetFriendsIds', [])));
    }

    GetFriendsByUserId(userId: string): Observable<UserFriendModel[]> {
      let url = this.apiUrl + "/GetFriends";
      let queryParam = new HttpParams().set('userId', userId.toString());
      console.log(queryParam);
      return this.http.get<UserFriendModel[]>(url, {params: queryParam}
      )
        .pipe(catchError(this.handleError<UserFriendModel[]>('GetFriends', [])));
    }

    AddFriend(userId: string): Observable<boolean> {
      let url = this.apiUrl + "/add-friend";
      let queryParam = new HttpParams().set('userId', userId.toString());
      console.log(queryParam);
      return this.http.get<boolean>(url, {params: queryParam}
      )
        .pipe(catchError(this.handleError<boolean>('add-friend', false)));
    }
  
    // Error handling method
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        return of(result as T);
      };
    }
  }
