import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatroomRoutingModule } from './chatroom-routing.module';
import { ChatroomComponent } from './chatroom.component';


@NgModule({
  declarations: [
    ChatroomComponent
  ],
  imports: [
    CommonModule,
    ChatroomRoutingModule
  ]
})
export class ChatroomModule { }