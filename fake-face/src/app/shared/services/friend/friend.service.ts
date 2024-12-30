import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class FriendService {
    private apiUrl = 'https://localhost:7258/api/friend';
  
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) {}
  
    GetFriendsByUserId(userId: string): Observable<number[]> {
      let url = this.apiUrl + "/GetFriends";
      let queryParam = new HttpParams().set('userId', userId.toString());
      console.log(queryParam);
      return this.http.get<number[]>(url, {params: queryParam}
      )
        .pipe(catchError(this.handleError<number[]>('GetFriends', [])));
    }
  
    // Error handling method
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        return of(result as T);
      };
    }
  }
