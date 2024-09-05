import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { Image } from '../models/Image';

@Injectable({
  providedIn: 'root'
})
export class FeedimagesService {

  //HTTP kérés

  constructor(private http: HttpClient) { }

  loadImageMeta(metaUrl: string): Observable<Array<Image>> {
    return this.http.get(environment.hostUrl + '/assets/' + metaUrl) as Observable<Array<Image>>;
  }

  loadImage(imageUrl: string){
    return this.http.get(environment.hostUrl + '/assets/' + imageUrl, {responseType: 'blob'});
  }

}
