import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from '../../shared/models/login_user/login_user.model';
import { UserService } from '../../shared/services/user/user.service';
import { TOAST_STATE, ToastService } from '../../shared/toast/toast.service';

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

  constructor(private router: Router, private userService: UserService, private toastService: ToastService){

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
    
    //this.router.navigateByUrl('/feed');

    this.getFormValues();
    //console.log("login");
    this.userService.login(this.loginUser).subscribe(data => {
      localStorage.setItem("token", data.token!);
      this.toastService.showToast(TOAST_STATE.success, "Sikeres bejelentkezés");
    });


  }

}
