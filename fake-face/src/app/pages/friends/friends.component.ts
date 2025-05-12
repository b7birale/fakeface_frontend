import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { UserPerson } from '../../shared/models/user/user-person.model';
import { Router } from '@angular/router';
import { UtilService } from '../../shared/services/util/util.service';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as FriendAction from '../../shared/services/friend/friend-store/friend.action';
import * as ChatroomAction from '../../shared/services/chatroom/chatroom-store/chatroom.action';
import { NewFriendRequest } from '../../shared/models/friend_request/new_friend_request.model';
import { UserFriendModel } from '../../shared/models/user/user-friend.model';
import { ChatroomModel } from '../../shared/models/chatroom/chatroom.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})

export class FriendsComponent implements OnInit {
  
    destroy$: Subject<boolean> = new Subject<boolean>();
    safeImg!: SafeResourceUrl;
    userId: number = 0;
    friends: UserFriendModel[] = []
    invitedUsers: number[] = []
    searchText: string = ""
  
    constructor(
      private router: Router,
      private utilService: UtilService,
      private store: Store,
      private action$?: Actions
    ){
      action$?.pipe(ofType(FriendAction.GetFriendsByUserIdSuccess), takeUntil(this.destroy$)).subscribe((response) => {
        if (response.data !== null && response.data !== undefined) {
          this.friends = response.data;
          this.createSafeUrls();
          console.log("response.data: ", response.data);
        }
      })
      action$?.pipe(ofType(ChatroomAction.CreateChatroomSuccess), takeUntil(this.destroy$)).subscribe((response) => {
        if (response.data !== null && response.data !== undefined && response.data > 0) {
          this.router.navigateByUrl("/chatrooms?chatroom_id=" + response.data);
        }
      })
    }
  
    ngOnInit(): void {
      this.userId = Number(localStorage.getItem("id"));
      if(this.userId){
        this.store.dispatch(FriendAction.GetFriendsByUserId({data: this.userId.toString()}));
      }
    }

    createSafeUrls(){
      this.friends = JSON.parse(JSON.stringify(this.friends));
      for (let index = 0; index < this.friends.length; index++) {
        if(this.friends[index].profilePicture && this.friends[index].profilePicture !== ''){
          this.friends[index].pictureSafeUrl = this.utilService.decodeBase64ImageFileToSecurityTrustResource(this.friends[index].profilePicture!);
        }
      }
    }
      
    openChatroom(friendUser: UserFriendModel){
      const logged_user_first_name = localStorage.getItem("firstname");
      const logged_user_last_name = localStorage.getItem("lastname");
      const logged_user_id = localStorage.getItem("id");

      let chatroom_name = logged_user_first_name + " " + logged_user_last_name + " - " + friendUser.firstname + " " + friendUser.lastname;

      let dto: ChatroomModel = {
        chatroomId: 0,
        name: chatroom_name,
        userIdOne: friendUser.userId!,
        userIdTwo: Number(logged_user_id)
      }
      this.store.dispatch(ChatroomAction.CreateChatroom({data: dto}));
    }

    get filteredUsers(): UserFriendModel[] {
      return this.friends.filter(x => x.lastname.toLowerCase().includes(this.searchText.toLowerCase()) || x.firstname.toLowerCase().includes(this.searchText.toLowerCase()));
    }

}
