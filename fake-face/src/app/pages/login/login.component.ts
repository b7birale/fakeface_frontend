import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router){

  }

  ngOnInit(): void{

  }

  login(){
    if (this.email.value === 'test@gmail.com' && this.password.value === 'testpw'){
      this.router.navigateByUrl('/feed');
    } else {
      console.error('Incorrect email or password!');
    }
  }

}
