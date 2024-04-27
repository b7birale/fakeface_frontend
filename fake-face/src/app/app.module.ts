import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { FeedComponent } from './pages/feed/feed.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MenuComponent } from './shared/menu/menu.component';
//import { FormsModule } from '@angular/forms';
//import { DateFormatPipe } from './shared/pipes/date-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    //FeedComponent,
    FriendsComponent,
    ProfileComponent,
    MenuComponent
    //DateFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    //FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
