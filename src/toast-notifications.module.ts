import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastNotificationsConfig } from './toast-notifications.config';
import { ToastContainerComponent } from './toast-container/toast-container.component';

const defaultConfig: ToastNotificationsConfig = {duration: 8000};

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ToastContainerComponent,
  ],
  entryComponents: [
    ToastContainerComponent,
  ],
})
export class ToastNotificationsModule {

  constructor(@Optional() @SkipSelf() parentModule: ToastNotificationsModule) {
    if (parentModule) {
      throw new Error('ToastNotificationsModule is already loaded. Import it in the root module only');
    }
  }

  static forRoot(config = defaultConfig): ModuleWithProviders {
    return {
      ngModule: ToastNotificationsModule,
      providers: [
        {provide: ToastNotificationsConfig, useValue: config}
      ]
    };
  }
}
