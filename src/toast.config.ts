import { ToastNotificationsConfig } from './toast-notifications.config';
import { Type } from '@angular/core';

export type ToastType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

export class ToastConfig extends ToastNotificationsConfig {
  text?: string;
  caption?: string;
  type?: ToastType = 'light';
  component?: Type<any>;
}
