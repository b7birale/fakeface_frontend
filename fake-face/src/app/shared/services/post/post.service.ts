import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { User } from "../../models/user/user.model";
import { LoginUser } from "../../models/login_user/login_user.model";
import { Post } from "../../models/post/post.model";

@Injectable({
    providedIn: 'root',
  })
  export class PostService {
    private apiUrl = 'https://localhost:7258/api/post';
  
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) {}
  
    getPostsByUserIds(): Observable<Post[]> {
      let url = this.apiUrl + "/GetPosts";
      return this.http.get<Post[]>(url)
        .pipe(catchError(this.handleError<Post[]>('GetPosts', [])));
    }
  
    // Error handling method
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        return of(result as T);
      };
    }
  }
