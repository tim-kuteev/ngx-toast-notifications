import { InjectionToken, Type } from '@angular/core';

export const TOAST_NOTIFICATIONS_CONFIG = new InjectionToken<ToastNotificationsConfig>('ToastNotificationsConfig');

export type ToastType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface ToastNotificationsConfig {
  position?: ToastPosition;
  autoClose?: boolean;
  duration?: number;
  type?: ToastType;
  component?: Type<any>;
  preventDuplicates?: boolean;
}
