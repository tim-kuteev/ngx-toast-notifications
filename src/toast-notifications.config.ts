import { InjectionToken, Type } from '@angular/core';

export const TOAST_NOTIFICATIONS_CONFIG = new InjectionToken<ToastNotificationsConfig>('ToastNotificationsConfig');

export type ToastType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

export interface ToastNotificationsConfig {
  autoClose?: boolean;
  duration?: number;
  type?: ToastType;
  component?: Type<any>;
  preventDuplicates?: boolean;
}
