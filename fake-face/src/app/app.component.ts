import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fake-face';
  page = 'feed';

  changePage(selectedPage: string){
    this.page = selectedPage;
  }
}
