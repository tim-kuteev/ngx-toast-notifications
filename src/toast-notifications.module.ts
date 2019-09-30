import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TOAST_NOTIFICATIONS_CONFIG, ToastNotificationsConfig } from './toast-notifications.config';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { BasicToastContentComponent } from './toast-content/basic-toast-content.component';
import { ToastContentDirective } from './toast-content/toast-content.directive';
import { Toaster } from './toaster';
import { ToastContainerService } from './toast-container.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ToastContainerComponent,
    BasicToastContentComponent,
    ToastContentDirective,
  ],
  entryComponents: [
    ToastContainerComponent,
    BasicToastContentComponent,
  ],
  providers: [
    Toaster,
    ToastContainerService,
    {provide: TOAST_NOTIFICATIONS_CONFIG, useValue: {}},
  ],
})
export class ToastNotificationsModule {

  constructor(@Optional() @SkipSelf() parentModule: ToastNotificationsModule) {
    if (parentModule) {
      throw new Error('ToastNotificationsModule is already loaded. Import it in the root module only');
    }
  }

  static forRoot(config: ToastNotificationsConfig = {}): ModuleWithProviders {
    return {
      ngModule: ToastNotificationsModule,
      providers: [
        {provide: TOAST_NOTIFICATIONS_CONFIG, useValue: config},
      ]
    };
  }
}
