import { ToastConfig } from './toast.config';
import { Toast } from './toast';

export class ToastHandler {

  toasts: Set<Toast> = new Set<Toast>();

  add(config: ToastConfig) {
    const toast: Toast = new Toast(config, this._delete.bind(this));
    this.toasts.add(toast);
    return toast;
  }

  private _delete(toast: Toast) {
    this.toasts.delete(toast);
  }
}
