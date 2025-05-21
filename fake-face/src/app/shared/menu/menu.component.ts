import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Subject, takeUntil } from 'rxjs';
import * as UserAction from '../../shared/services/user/user-store/user.action';
import { Router } from '@angular/router';
import { UtilService } from '../services/util/util.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  isDropdownOpen = false;
  isNotificationMenuOpen = false;
  isHamburgerMenuOpen = false;
  userId? : number = undefined;
  firstname: string = "";
  lastname: string = "";
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private utilService: UtilService,
    private action$?: Actions
  ){
    action$?.pipe(ofType(UserAction.LoginSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      let token = this.utilService.decodeToken(response.data.token!);
      this.userId = Number(token.Id);
      this.firstname = token.Firstname;
      this.lastname = token.Lastname;
    })
  }

  ngOnInit(): void{
    this.userId = Number(localStorage.getItem("id"));
    this.lastname = localStorage.getItem("lastname") ?? "";
    this.firstname = localStorage.getItem("firstname") ?? "";
  }

  menuSwitch(pageValue: string){
    this.selectedPage.emit(pageValue);
  }

  profileClick(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  notificationClick(){
    this.isNotificationMenuOpen = !this.isNotificationMenuOpen;
  }

  hamburgerClick(){
    this.isHamburgerMenuOpen = !this.isHamburgerMenuOpen;
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(["/login"]).then(() => window.location.reload());
  }

}
