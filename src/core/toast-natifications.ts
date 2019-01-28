import { Injectable } from '@angular/core';
import { ToastConfig, ToastType } from '../toast.config';
import { Toaster } from '../toaster';

@Injectable()
/**
 * @deprecated since version 1.0.0 use Toaster
 */
export class ToastNotifications {

  constructor(
      private _toaster: Toaster,
  ) {
  }

  /**
   * @deprecated since version 1.0.0
   */
  next(toast: {text: string, caption?: string, type?: ToastType, lifetime: number, duration: number}) {
    const config: ToastConfig = {
      text: toast.text,
      caption: toast.caption,
      type: toast.type,
      duration: toast.duration || toast.lifetime,
    };
    this._toaster.next(config);
  }
}
