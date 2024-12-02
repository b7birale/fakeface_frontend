import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user/user.service';
import { User } from '../../shared/models/user/user.model';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {


  form: FormGroup = new FormGroup({});
  user: User = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    user_id: 0,
    birthdate: new Date()
  }
  data$: Observable<boolean> | undefined;

  constructor(private router: Router, private userService: UserService){ //, private userService: UserService

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
    this.user.birthdate = this.form.controls['birthdate'].value;
  }

  register(){
    this.getFormValues();
    //console.log("register");
    this.userService.signUp(this.user).subscribe(data => console.log('Raw data:', data));
    
    //this.data$ = 
    //pipe(tap(data => console.log('Raw data:', data)));
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
