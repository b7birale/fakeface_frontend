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

  constructor(){
    this.chosenImage = this.feedObject[0];
  }

  reload(){
    
  }
}
