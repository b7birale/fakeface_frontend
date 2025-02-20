import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as UserAction from '../../shared/services/user/user-store/user.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy{

  destroy$: Subject<boolean> = new Subject<boolean>();
  form: FormGroup = new FormGroup({});
  userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private action$?: Actions
  ){
    action$?.pipe(ofType(UserAction.GetUserToProfileSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      if (response.data !== null && response.data !== undefined) {
        console.log(response.data);
      }

    })
  }

  ngOnInit(): void {
    //this.initForm();
    this.userId = Number(localStorage.getItem("id"));
    if(this.userId){
      this.store.dispatch(UserAction.GetUserToProfile({data: this.userId}));
    }
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
