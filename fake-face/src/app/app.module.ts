import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { FeedComponent } from './pages/feed/feed.component';
//import { FriendsComponent } from './pages/friends/friends.component';
//import { ProfileComponent } from './pages/profile/profile.component';
import { MenuComponent } from './shared/menu/menu.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//import { FormsModule } from '@angular/forms';
//import { DateFormatPipe } from './shared/pipes/date-format.pipe';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    //FeedComponent,
    //FriendsComponent,
    //ProfileComponent,
    MenuComponent
    //DateFormatPipe
  ],
  imports: [
    //FormsModule
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButton,
    MatIconModule,
    FlexLayoutModule,
    MatListModule
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
