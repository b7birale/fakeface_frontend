import { Component, OnDestroy, OnInit } from '@angular/core';
import * as ChatroomAction from '../../shared/services/chatroom/chatroom-store/chatroom.action';
import * as MessageAction from '../../shared/services/message/message-store/message.action';
import * as UserAction from '../../shared/services/user/user-store/user.action';
import { Subject, takeUntil } from 'rxjs';
import { ChatroomModel } from '../../shared/models/chatroom/chatroom.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../shared/services/util/util.service';
import { Actions, ofType } from '@ngrx/effects';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Message } from '../../shared/models/message/message.model';
import { TOAST_STATE, ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss'
})
export class ChatroomComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  safeImg!: SafeResourceUrl;
  userId: number = 0;
  chatrooms: ChatroomModel[] = []
  messages: Message[] = []
  myProfilePicture: string = ""
  senderProfilePicture: string = ""
  messageContent: string = ""

  currentChatroomId: number = 0
  currentChatroom: ChatroomModel = {
    chatroomId: 0,
    name: '',
    userIdOne: 0,
    userIdTwo: 0
  }

  constructor(
    private router: Router,
    private utilService: UtilService,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private toast: ToastService,
    private action$?: Actions
  ){
    action$?.pipe(ofType(ChatroomAction.GetChatroomsByUserIdSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      if (response.data !== null && response.data !== undefined) {
        this.chatrooms = response.data;
      }
    })
    action$?.pipe(ofType(MessageAction.GetMessagesByChatroomIdSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      if (response.data !== null && response.data !== undefined) {
        this.messages = response.data;
        const index = this.chatrooms.findIndex(x => x.chatroomId === this.currentChatroomId);
        if(this.chatrooms && this.chatrooms[index].profilePicture && index > -1){
          this.senderProfilePicture = this.chatrooms[index].profilePicture!;
        } else{
          this.senderProfilePicture = "";
        }
      }
    })
    action$?.pipe(ofType(MessageAction.SendMessageSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      if (response.data !== null && response.data !== undefined) {
        this.store.dispatch(MessageAction.GetMessagesByChatroomId({data: this.currentChatroomId}));
      }
    })
    action$?.pipe(ofType(UserAction.GetUserToProfileSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      if (response.data !== null && response.data !== undefined && response.data.profilePicture) {
        this.myProfilePicture = response.data.profilePicture;
      }
    })
  }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("id"));
    this.store.dispatch(UserAction.GetUserToProfile({data: this.userId}));
    this.activatedRoute.queryParamMap.subscribe(params => {
      const id = params.get("chatroom_id");
      if(id){
        this.currentChatroomId = Number(id);
        this.store.dispatch(MessageAction.GetMessagesByChatroomId({data: this.currentChatroomId}));
      }
    })
    if(this.userId){
      this.store.dispatch(ChatroomAction.GetChatroomsByUserId({data: this.userId}));
    }
  }

  chatroomClicked(chatroomId: number){
    this.currentChatroomId = chatroomId;
    this.store.dispatch(MessageAction.GetMessagesByChatroomId({data: chatroomId}));
  }

  sendMessage(){

    let message: Message = {
      messageId: 0,
      senderUserId: 0,
      recieverUserId: 0,
      chatroomId: 0,
      content: '',
      messageDatetime: new Date()
    }

    const chatroom = this.chatrooms.find(x => x.chatroomId === this.currentChatroomId);
    let recieverUserId = 0;
    if(chatroom){
      if(chatroom.userIdOne !== this.userId){
        recieverUserId = chatroom.userIdOne;
      } else{
        recieverUserId = chatroom.userIdTwo;
      }
    }

    if(this.messageContent.length > 0){

      message.senderUserId = this.userId;
      message.recieverUserId = recieverUserId;
      message.content = this.messageContent;
      message.chatroomId = this.currentChatroomId;
      message.messageDatetime = new Date();

      this.store.dispatch(MessageAction.SendMessage({data: message}));
    } else{
      this.toast.showToast(TOAST_STATE.warning, "Please write something first!");
    }

    this.messageContent = "";

  }

  getSafeImg(profilePicture: string){
    if(profilePicture.length > 0){
      return this.utilService.decodeBase64ImageFileToSecurityTrustResource(profilePicture);
    } else{
      return "";
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
