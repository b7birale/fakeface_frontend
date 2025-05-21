import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { FeedComment } from "../../models/comment/comment.feed.model";
import { AddCommentModel } from "../../models/comment/comment.model";

@Injectable({
    providedIn: 'root',
  })
  export class CommentService {
    private apiUrl = 'https://localhost:7258/api/comments';
  
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) {}
  
    GetCommentsByPostId(post_id: number): Observable<FeedComment[]> {
      let url = this.apiUrl + "/GetComments";
      let queryParam = new HttpParams().set('post_id', post_id.toString());
      console.log(queryParam);
      return this.http.get<FeedComment[]>(url, {params: queryParam}
      )
        .pipe(catchError(this.handleError<FeedComment[]>('GetComments', [])));
    }

    AddComment(dto: AddCommentModel): Observable<boolean> {
      let url = this.apiUrl + "/AddComment";
      return this.http.post<boolean>(url, dto
      )
        .pipe(catchError(this.handleError<boolean>('AddComment', false)));
    }
  
    DeleteComment(post_id: number): Observable<boolean> {
      let url = this.apiUrl + "/DeleteComment";
      let queryParam = new HttpParams().set('post_id', post_id.toString());
      console.log(queryParam);
      return this.http.get<boolean>(url, {params: queryParam}
      )
        .pipe(catchError(this.handleError<boolean>('DeleteComment', false)));
    }

    // Error handling method
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        return of(result as T);
      };
    }
  }
