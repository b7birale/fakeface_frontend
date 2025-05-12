import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { User } from "../../models/user/user.model";
import { LoginUser } from "../../models/login_user/login_user.model";
import { Post } from "../../models/post/post.model";
import { PostFeed } from "../../models/post/post-feed.model";

@Injectable({
    providedIn: 'root',
  })
  export class PostService {
    private apiUrl = 'https://localhost:7258/api/post';
  
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) {}
  
    getPostsByUserIds(userIds: string): Observable<PostFeed[]> {
      let url = this.apiUrl + "/GetPosts";
      let queryParam = new HttpParams().set('userIds', userIds.toString());
      return this.http.get<PostFeed[]>(url, {params: queryParam}
      )
        .pipe(catchError(this.handleError<PostFeed[]>('GetPosts', [])));
    }

    createPost(post: Post): Observable<boolean> {
      let url = this.apiUrl + "/InsertPost";
      return this.http.post<boolean>(url, post)
        .pipe(catchError(this.handleError<boolean>('InsertPost', false)));
    }
  
    // Error handling method
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        return of(result as T);
      };
    }
  }
