import { Inject, Injectable, Type } from '@angular/core';
import { ToastConfig } from './toast.config';
import { ToastContainerService } from './toast-container.service';
import { TOAST_NOTIFICATIONS_CONFIG, ToastNotificationsConfig } from './toast-notifications.config';
import { BasicToastContentComponent } from './toast-content/basic-toast-content.component';
import { Toast } from './toast';

const DEFAULT_CONFIG: ToastConfig = {duration: 8000, component: BasicToastContentComponent};

@Injectable()
export class Toaster {

  constructor(
      @Inject(TOAST_NOTIFICATIONS_CONFIG) private _config: ToastNotificationsConfig,
      private _containerService: ToastContainerService,
  ) {
  }

  open(text: string): Toast;
  open(config: ToastConfig): Toast;
  open(component: Type<any>, config?: ToastConfig): Toast;
  open(config: ToastConfig | string | Type<any>, componentConfig?: ToastConfig): Toast {
    if (typeof config === 'string') {
      config = {text: config as string};
    }
    if (config instanceof Type) {
      config = {...componentConfig, component: config as Type<any>};
    }
    config = {...DEFAULT_CONFIG, ...this._config, ...config};
    return this._containerService.ref.instance.add(config);
  }
}
