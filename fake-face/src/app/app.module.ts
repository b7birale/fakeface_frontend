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
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, PostService, FriendService, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
