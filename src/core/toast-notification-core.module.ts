import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastNotifications } from './toast-natifications';
import { ToastNotificationConfig } from './toast-notification.config';

const defaultConfig = <ToastNotificationConfig>{lifetime: 8000};

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ToastNotifications,
  ],
})
export class ToastNotificationCoreModule {

  constructor(@Optional() @SkipSelf() parentModule: ToastNotificationCoreModule) {
    if (parentModule) {
      throw new Error('ToastNotificationCoreModule is already loaded. Import it in the root module only');
    }
  }

  static forRoot(config = defaultConfig): ModuleWithProviders {
    return {
      ngModule: ToastNotificationCoreModule,
      providers: [
        {provide: ToastNotificationConfig, useValue: config}
      ]
    };
  }
}
