import { Injectable } from '@angular/core';
import { ToastConfig } from '../toast.config';
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
  next(toast: ToastConfig) {
    this._toaster.next(toast);
  }
}
