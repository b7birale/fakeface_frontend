import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { User } from "../../models/user/user.model";
import { LoginUser } from "../../models/login_user/login_user.model";
import { TokenModel } from "../../models/token/token.model";

@Injectable({
    providedIn: 'root',
  })
  export class UserService {
    private apiUrl = 'https://localhost:7258/api/authentication';  // Replace with your actual API URL , localhost..
    private userApiUrl = 'https://localhost:7258/api/user';

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

    login(model: LoginUser): Observable<TokenModel> {

      return this.http.post<TokenModel>(this.apiUrl + "/Login", model)
        .pipe(catchError(this.handleError<TokenModel>()));
    }

    signUp(user: User): Observable<boolean> {

      return this.http.post<boolean>(this.apiUrl + "/SignUp", user)
        .pipe(catchError(this.handleError<boolean>()));
    }

    getUserToProfile(user_id: number): Observable<User> {
      let queryParam = new HttpParams().set('user_id', user_id.toString());
      let url = this.userApiUrl + "/GetUserToProfile";
      return this.http.get<User>(url, {params: queryParam})
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
