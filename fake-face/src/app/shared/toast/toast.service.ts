import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const TOAST_STATE = {
    success: 'success-toast',
    warning: 'warning-toast',
    danger: 'danger-toast'
};


@Injectable({
    providedIn: 'root'
})
export class ToastService {
    // The boolean that drives the toast's 'open' vs. 'close' behavior  
    public showsToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // The message string that'll bind and display on the toast. 
    public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('Default Toast Message');

    // The state that will add a style class to the component. 
    public toastState$: BehaviorSubject<string> = new BehaviorSubject<string>(TOAST_STATE.success);

    constructor() { }

    showToast(toastState: string, toastMsg: string): void {
        this.toastState$.next(toastState);
        this.toastMessage$.next(toastMsg);
        this.showsToast$.next(true);

        setTimeout(() => {
            this.dismissToast();
          }, 3000);
    }

    dismissToast(): void {
        this.showsToast$.next(false);
    }
}