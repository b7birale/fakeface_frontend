import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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

  ngOnInit(): void{
    this.userId = Number(localStorage.getItem("id"));
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

}
