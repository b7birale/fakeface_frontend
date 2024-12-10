import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from '../../shared/models/login_user/login_user.model';
import { UserService } from '../../shared/services/user/user.service';
import { TOAST_STATE, ToastService } from '../../shared/toast/toast.service';
import { UtilService } from '../../shared/services/util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  loginUser: LoginUser = {
    email: '',
    password: ''
  }

  constructor(private router: Router, private userService: UserService, private toastService: ToastService, private utilService: UtilService){

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
    this.userService.login(this.loginUser).subscribe(data => {
      let token = this.utilService.decodeToken(data.token!);
      localStorage.setItem("token", data.token!);
      localStorage.setItem("fisrtname", token.Firstname);
      localStorage.setItem("lastname", token.Lastname);
      localStorage.setItem("email", token.Email!);
      localStorage.setItem("id", token.Id!);

      this.toastService.showToast(TOAST_STATE.success, "Sikeres bejelentkezés");

      this.router.navigateByUrl('/feed');
    });


  }

}
