import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ToastNotifications } from './toast-natifications';
import { ToastNotificationsConfig } from '../toast-notifications.config';
import { ToastNotificationsModule } from '../toast-notifications.module';

const defaultConfig: {lifetime?: number, duration?: number} = {lifetime: 8000};

@NgModule({
  imports: [
    ToastNotificationsModule,
  ],
  providers: [
    ToastNotifications,
  ],
})
/**
 * @deprecated since version 1.0.0 use ToastNotificationsModule
 */
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
        {provide: ToastNotificationsConfig, useValue: {duration: config.duration || config.lifetime}}
      ]
    };
  }
}
