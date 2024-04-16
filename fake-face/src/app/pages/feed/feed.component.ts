import { Component } from '@angular/core';
import { FeedObject } from '../../shared/constants/constants';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})

export class FeedComponent {
  feedObject: Array<any> = FeedObject;

  chosenImage: any;

  commentObject: any = {};
  comments: Array<any> = []; //egyelőre ebben a tömbben tároljuk a kommenteket -> később erre adatbázis lesz ofc

  constructor(){
    this.chosenImage = this.feedObject[0];
  }

  reload(){
    
  }

  addComment() {
    if(this.commentObject.username && this.commentObject.comment){
      this.commentObject['date'] = new Date();
      this.comments.push(this.commentObject);
    }
    
  }

}
