import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  isDropdownOpen = false;
  isNotificationMenuOpen = false;
  isHamburgerMenuOpen = false;

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
