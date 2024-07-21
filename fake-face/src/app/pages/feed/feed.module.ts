import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
//import { MenuComponent } from '../../shared/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';


@NgModule({
  declarations: [
    FeedComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FeedModule { }
