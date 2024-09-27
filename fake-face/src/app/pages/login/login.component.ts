import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  constructor(private router: Router){

  }

  ngOnInit(): void{
    this.initForm();
  }

  initForm(){
    this.form.addControl('email', new FormControl<string|null>(''));
    this.form.addControl('password', new FormControl<string|null>(''));
  }

  login(){
    if (this.form.controls['email'].value === 'test@gmail.com' && this.form.controls['password'].value === 'testpw'){
      this.router.navigateByUrl('/feed');
    } else {
      console.error('Incorrect email or password!');
    }
  }

}
