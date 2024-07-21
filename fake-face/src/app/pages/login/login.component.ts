import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DelayService } from '../../shared/services/delay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router, private delayService: DelayService){

  }

  ngOnInit(): void{

  }

  login(){
    if(this.email.value !== null && this.password.value !== null){
      this.delayService.delayWithPromise(this.email.value, this.password.value).then((data: boolean) => {
        this.router.navigateByUrl('/feed');
      }).catch(error => {
        console.error('Incorrect email or password!');
      }).finally(() => {
        console.log('This is executed finally.');
      });
    }
    
  }

}
