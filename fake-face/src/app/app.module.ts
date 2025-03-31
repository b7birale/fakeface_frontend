import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { UserService } from './shared/services/user/user.service';
import { SignupComponent } from './pages/signup/signup.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PostService } from './shared/services/post/post.service';
import { LoaderInterceptor } from './shared/interceptor/interceptor';
import { ToastComponent } from './shared/toast/toast.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FriendService } from './shared/services/friend/friend.service';
import { UserEffects } from './shared/services/user/user-store/user.effects';
import * as UserReducer from './shared/services/user/user-store/user.reducer';
import * as UserState from './shared/services/user/user-store/user.state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FriendEffects } from './shared/services/friend/friend-store/friend.effects';
import * as FriendReducer from './shared/services/friend/friend-store/friend.reducer';
import * as FriendState from './shared/services/friend/friend-store/friend.state';
import { PostEffects } from './shared/services/post/post-store/post.effects';
import * as PostReducer from './shared/services/post/post-store/post.reducer';
import * as PostState from './shared/services/post/post-store/post.state';
import { CommentEffects } from './shared/services/comment/comment-store/comment.effects';
import * as CommentReducer from './shared/services/comment/comment-store/comment.reducer';
import * as CommentState from './shared/services/comment/comment-store/comment.state';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CommentService } from './shared/services/comment/comment.service';
import { ChatroomEffects } from './shared/services/chatroom/chatroom-store/chatroom.effects';
import * as ChatroomReducer from './shared/services/chatroom/chatroom-store/chatroom.reducer';
import * as ChatroomState from './shared/services/chatroom/chatroom-store/chatroom.state';
import { ChatroomService } from './shared/services/chatroom/chatroom.service';
import { MessageEffects } from './shared/services/message/message-store/message.effects';
import * as MessageReducer from './shared/services/message/message-store/message.reducer';
import * as MessageState from './shared/services/message/message-store/message.state';
import { MessageService } from './shared/services/message/message.service';
import { PeopleEffects } from './shared/services/people/people-store/people.effect';
import * as PeopleReducer from './shared/services/people/people-store/people.reducer';
import * as PeopleState from './shared/services/people/people-store/people.state';
import { PeopleService } from './shared/services/people/people.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SignupComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forFeature(UserState.USER_FEATURE_KEY, UserReducer.reducer),
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(FriendState.FRIEND_FEATURE_KEY, FriendReducer.reducer),
    EffectsModule.forFeature([FriendEffects]),
    StoreModule.forFeature(PostState.POST_FEATURE_KEY, PostReducer.reducer),
    EffectsModule.forFeature([PostEffects]),
    StoreModule.forFeature(CommentState.COMMENT_FEATURE_KEY, CommentReducer.reducer),
    EffectsModule.forFeature([CommentEffects]),
    StoreModule.forFeature(ChatroomState.CHATROOM_FEATURE_KEY, ChatroomReducer.reducer),
    EffectsModule.forFeature([ChatroomEffects]),
    StoreModule.forFeature(MessageState.MESSAGE_FEATURE_KEY, MessageReducer.reducer),
    EffectsModule.forFeature([MessageEffects]),
    StoreModule.forFeature(PeopleState.PEOPLE_FEATURE_KEY, PeopleReducer.reducer),
    EffectsModule.forFeature([PeopleEffects]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    PostService,
    FriendService,
    CommentService,
    ChatroomService,
    MessageService,
    PeopleService,
    NgxImageCompressService, {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
