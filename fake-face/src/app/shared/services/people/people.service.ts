import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { User } from "../../models/user/user.model";
import { LoginUser } from "../../models/login_user/login_user.model";
import { TokenModel } from "../../models/token/token.model";
import { UpdateUser } from "../../models/user/user-update.model";
import { UserPerson } from "../../models/user/user-person.model";
import { NewFriendRequest } from "../../models/friend_request/new_friend_request.model";

@Injectable({
    providedIn: 'root',
  })
  export class PeopleService {
    private peopleApiUrl = 'https://localhost:7258/api/people';

    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) {}
  
    // Get all users
    getAllUsers(user_id: string): Observable<UserPerson[]> {
      let queryParam = new HttpParams().set('user_id', user_id.toString());
      let url = this.peopleApiUrl + "/users";
      return this.http.get<User[]>(url, {params: queryParam})
        .pipe(catchError(this.handleError<User[]>('getAllUsers', [])));
    }

     // Send friend request
     sendFriendRequest(dto: NewFriendRequest): Observable<boolean> {
      let url = this.peopleApiUrl + "/friend-request";
      return this.http.post<boolean>(url, dto)
        .pipe(catchError(this.handleError<boolean>('friend-request', false)));
    }
  
    // Error handling method
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        return of(result as T);
      };
    }
  }
