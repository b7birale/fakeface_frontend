import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from '../../shared/models/login_user/login_user.model';
import { TOAST_STATE, ToastService } from '../../shared/toast/toast.service';
import { UtilService } from '../../shared/services/util/util.service';
import { Subject, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as UserAction from '../../shared/services/user/user-store/user.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({});

  loginUser: LoginUser = {
    email: '',
    password: ''
  }

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private toastService: ToastService,
    private utilService: UtilService,
    private store: Store,
    private action$?: Actions
  ){
    action$?.pipe(ofType(UserAction.LoginSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      if (response.data !== null && response.data !== undefined) {
        let token = this.utilService.decodeToken(response.data.token!);
        localStorage.setItem("token", response.data.token!);
        localStorage.setItem("fisrtname", token.Firstname);
        localStorage.setItem("lastname", token.Lastname);
        localStorage.setItem("email", token.Email!);
        localStorage.setItem("id", token.Id!);
        console.log(token.Id);
        this.toastService.showToast(TOAST_STATE.success, "Sikeres bejelentkezés");

        this.router.navigateByUrl('/feed');
      }
    })
  }
  
  ngOnInit(): void{
    this.initForm();
  }

  initForm(){
    this.form.addControl('email', new FormControl<string|null>(''));
    this.form.addControl('password', new FormControl<string|null>(''));
  }

  getFormValues(){
    this.loginUser.email = this.form.controls['email'].value;
    this.loginUser.password = this.form.controls['password'].value;
  }

  login(){
    this.getFormValues();
    this.store.dispatch(UserAction.Login({data: this.loginUser}));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
