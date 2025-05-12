import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { UserPerson } from '../../shared/models/user/user-person.model';
import { Router } from '@angular/router';
import { UtilService } from '../../shared/services/util/util.service';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as FriendAction from '../../shared/services/friend/friend-store/friend.action';
import { NewFriendRequest } from '../../shared/models/friend_request/new_friend_request.model';
import * as PeopleAction from '../../shared/services/people/people-store/people.action';
import { FriendRequest } from '../../shared/models/friend_request/friend_request.model';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})

export class RequestsComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  requests: NewFriendRequest[] = []
  userId: number = 0;

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("id"));
    if(this.userId){
      this.store.dispatch(PeopleAction.GetFriendRequests({data: this.userId}));
    }
  }
  
  constructor(
    private router: Router,
    private utilService: UtilService,
    private store: Store,
    private action$?: Actions
  ){
    action$?.pipe(ofType(PeopleAction.GetFriendRequestsSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      if (response.data !== null && response.data !== undefined) {
        this.requests = response.data;
        console.log("response.data: ", response.data);
      }
    });

    action$?.pipe(ofType(PeopleAction.AcceptFriendRequestSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      this.store.dispatch(PeopleAction.GetFriendRequests({data: this.userId}));
    });

    action$?.pipe(ofType(PeopleAction.RejectFriendRequestSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      this.store.dispatch(PeopleAction.GetFriendRequests({data: this.userId}));
    });

  }

  acceptFriendRequest(request: NewFriendRequest){
    let friend_request: FriendRequest = {
      requestId: 0,
      senderUserId: request.senderUserId,
      recieverUserId: request.recieverUserId,
      accepted: false,
      rejected: false
    } 
    this.store.dispatch(PeopleAction.AcceptFriendRequest({data: friend_request}));
  }

  rejectFriendRequest(request: NewFriendRequest){
    let friend_request: FriendRequest = {
      requestId: 0,
      senderUserId: request.senderUserId,
      recieverUserId: request.recieverUserId,
      accepted: false,
      rejected: false
    }
    this.store.dispatch(PeopleAction.RejectFriendRequest({data: friend_request}));
  }

}
