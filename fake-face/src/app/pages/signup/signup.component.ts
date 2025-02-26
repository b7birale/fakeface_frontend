import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user/user.model';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { TOAST_STATE, ToastService } from '../../shared/toast/toast.service';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as UserAction from '../../shared/services/user/user-store/user.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  form: FormGroup = new FormGroup({});
  user: User = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    user_id: 0,
    birthDate: new Date()
  }
  data$: Observable<boolean> | undefined;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private store: Store,
    private action$?: Actions
  ){
    action$?.pipe(ofType(UserAction.SignUpSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      if (response.data !== null && response.data !== undefined) {

        this.toastService.showToast(TOAST_STATE.success, "Sikeres regisztráció");
        this.router.navigateByUrl('/login');
      }
    })
  }


  ngOnInit(): void{
    this.initForm();
  }

  initForm(){
    this.form.addControl('email', new FormControl<string|null>(''));
    this.form.addControl('password', new FormControl<string|null>(''));
    //this.form.addControl('repassword', new FormControl<string|null>(''));
    this.form.addControl('firstname', new FormControl<string|null>(''));
    this.form.addControl('lastname', new FormControl<string|null>(''));
    this.form.addControl('birthdate', new FormControl<Date|null>(null));
  }

  getFormValues(){
    this.user.email = this.form.controls['email'].value;
    this.user.password = this.form.controls['password'].value;
    this.user.firstname = this.form.controls['firstname'].value;
    this.user.lastname = this.form.controls['lastname'].value;
    this.user.birthDate = this.form.controls['birthdate'].value;
  }

  register(){
    this.getFormValues();
    this.store.dispatch(UserAction.SignUp({data: this.user}));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
