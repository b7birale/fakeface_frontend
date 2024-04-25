import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { AppComponent } from '../../app.component';


@NgModule({
  declarations: [
    FeedComponent,
    AppComponent,
    MenuComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    FormsModule
  ]
})
export class FeedModule { }
