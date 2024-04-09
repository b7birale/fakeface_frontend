import { Component } from '@angular/core';
import { FeedObject } from '../../shared/constants/constants';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})

export class FeedComponent {
  feedObject: any = FeedObject;
}
