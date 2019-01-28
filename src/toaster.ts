import { Injectable } from '@angular/core';
import { ToastNotificationsModule } from './toast-notifications.module';
import { ToastConfig } from './toast.config';
import { ToastContainerService } from './toast-container.service';
import { ToastNotificationsConfig } from './toast-notifications.config';

@Injectable({providedIn: ToastNotificationsModule})
export class Toaster {

  constructor(
      private _containerService: ToastContainerService,
      private _config: ToastNotificationsConfig,
  ) {
  }

  next(toastConfig: ToastConfig) {
    const config = {...this._config, ...toastConfig} as ToastConfig;
    return this._containerService.ref.instance.next(config);
  }
}
