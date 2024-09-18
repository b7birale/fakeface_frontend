import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Input() currentPage = "";
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();

  menuSwitch(pageValue: string){
    this.selectedPage.emit(pageValue);
  }

  close(){
    this.onCloseSidenav.emit(true);
  }

}
