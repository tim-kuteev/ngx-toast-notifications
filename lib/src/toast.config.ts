import { ToastNotificationsConfig } from './toast-notifications.config';

export interface ToastConfig extends ToastNotificationsConfig {
  text?: string;
  caption?: string;
}
