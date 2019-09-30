import { Observable, Subject } from 'rxjs';
import { Type } from '@angular/core';
import { ToastType } from './toast-notifications.config';
import { ToastConfig } from './toast.config';

export class Toast {

  readonly autoClose: boolean;
  readonly duration: number;
  readonly text: string;
  readonly caption: string;
  readonly type: ToastType;
  readonly component: Type<any>;

  private readonly _closeFunction: (toast: Toast) => void;
  private readonly _onClose = new Subject<any>();
  private _timeoutId: any;

  constructor(
      config: ToastConfig,
      closeFunction: (toast: Toast) => void,
  ) {
    this.autoClose = config.autoClose;
    this.duration = config.duration > 0 ? config.duration : 0;
    this.text = config.text;
    this.caption = config.caption;
    this.type = config.type;
    this.component = config.component;
    this._closeFunction = closeFunction;
    this._setTimeout();
  }

  get onClose(): Observable<any> {
    return this._onClose.asObservable();
  }

  close(result?: any) {
    if (!this._onClose.closed) {
      this._onClose.next(result);
      this._onClose.complete();
    }
    this._closeFunction(this);
    this._clearTimeout();
  }

  private _setTimeout() {
    if (this.autoClose && this.duration > 0) {
      this._timeoutId = setTimeout(() => this.close(), this.duration);
    }
  }

  private _clearTimeout() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }
}
