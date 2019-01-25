import { Injectable } from '@angular/core';
import { ToastNotificationsModule } from './toast-notifications.module';
import { ToastConfig } from './toast.config';
import { ToastContainerService } from './toast-container.service';

@Injectable({providedIn: ToastNotificationsModule})
export class Toaster {

  constructor(
      private _containerService: ToastContainerService,
  ) {
  }

  next(toast: ToastConfig) {
    this._containerService.ref.instance.next(toast);
  }
}
