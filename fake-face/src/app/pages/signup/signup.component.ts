import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {


  form: FormGroup = new FormGroup({});
  constructor(private router: Router){

  }

  ngOnInit(): void{
    this.initForm();
  }

  initForm(){
    this.form.addControl('email', new FormControl<string|null>(''));
    this.form.addControl('password', new FormControl<string|null>(''));
    this.form.addControl('repassword', new FormControl<string|null>(''));
    this.form.addControl('firstname', new FormControl<string|null>(''));
    this.form.addControl('lastname', new FormControl<string|null>(''));
    this.form.addControl('birthdate', new FormControl<string|null>(''));
  }

  register(){
    
  }




/*

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });



  constructor(private location: Location){

  }

  onSubmit(){
    console.log(this.signUpForm.value);
  }

  goBack(){
    this.location.back();
  }

*/

}
