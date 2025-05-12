import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatroomRoutingModule } from './chatroom-routing.module';
import { ChatroomComponent } from './chatroom.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatroomComponent
  ],
  imports: [
    CommonModule,
    ChatroomRoutingModule,
    FormsModule
  ]
})
export class ChatroomModule { }