import { Component } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private toaster: Toaster,
  ) {
  }

  showToast() {
    this.toaster.open({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
      caption: 'Toast notification',
      type: 'primary',
    });
  }
}
