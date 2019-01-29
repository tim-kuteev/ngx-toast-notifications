import { Injectable, Type } from '@angular/core';
import { ToastNotificationsModule } from './toast-notifications.module';
import { ToastConfig } from './toast.config';
import { ToastContainerService } from './toast-container.service';
import { ToastNotificationsConfig } from './toast-notifications.config';
import { BasicToastContentComponent } from './toast-content/basic-toast-content.component';
import { Toast } from './toast';

@Injectable({providedIn: ToastNotificationsModule})
export class Toaster {

  constructor(
      private _containerService: ToastContainerService,
      private _config: ToastNotificationsConfig,
  ) {
  }

  open(toastConfig: ToastConfig): Toast {
    if (!toastConfig.text && !toastConfig.component) {
      console.error('Missing parameters to open a Toast. Please provide either [text] or [component].', toastConfig);
      throw new Error('Failed to open a Toast.');
    }
    const config = <ToastConfig>{...this._config, component: BasicToastContentComponent, ...toastConfig};
    return this._containerService.ref.instance.add(config);
  }

  openComponent(component: Type<any>, toastConfig?: ToastConfig): Toast {
    const config = <ToastConfig>{...toastConfig, component: component};
    return this.open(config);
  }
}
