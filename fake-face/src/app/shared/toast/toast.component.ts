import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  // And then these ⤵
  animations: [
    trigger('toastTrigger', [ // This refers to the @trigger we created in the template      
      state('open', style({ transform: 'translateY(0%)' })), // This is how the 'open' state is styled      
      state('close', style({ transform: 'translateY(-200%)' })), // This is how the 'close' state is styled      
      transition('open <=> close', [ // This is how they're expected to transition from one to the other         
        animate('300ms ease-in-out')
      ])
    ])
  ]
})

export class ToastComponent implements OnInit {

  TOAST_STATE = {
    success: 'success-toast',
    warning: 'warning-toast',
    danger: 'danger-toast'
  };

  actualToastState = '';

  constructor(public toast: ToastService) { }

  ngOnInit(): void {
    this.toast.toastState$.subscribe(x => this.actualToastState = x);
  }

  dismiss(): void {
    this.toast.dismissToast();
  }
}