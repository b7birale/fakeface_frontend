import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { User } from "../../models/user/user.model";

@Injectable({
    providedIn: 'root',
  })
  export class UserService {
    private apiUrl = 'https://localhost:7258/api/authentication';  // Replace with your actual API URL , localhost..
  
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) {}
  
    // Get all users
    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.apiUrl)
        .pipe(catchError(this.handleError<User[]>('getUsers', [])));
    }
  
    // Get a user by ID
    getUserById(id: number): Observable<User> {

      return this.http.post<User>(this.apiUrl, id)
        .pipe(catchError(this.handleError<User>()));
    }
  
    // Error handling method
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        return of(result as T);
      };
    }
  }
