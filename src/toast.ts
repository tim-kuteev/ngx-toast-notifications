import { Observable, Subject } from 'rxjs';
import { Type } from '@angular/core';
import { ToastType } from './toast-notifications.config';
import { ToastConfig } from './toast.config';

export class Toast {

  readonly duration: number;
  readonly text: string;
  readonly caption: string;
  readonly type: ToastType;
  readonly component: Type<any>;

  private readonly _closeFunction: Function;
  private readonly _onClose = new Subject<any>();
  private _timeoutId: any;

  constructor(
      config: ToastConfig,
      closeFunction: Function,
  ) {
    this.duration = config.duration;
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
    if (this.duration > 0) {
      this._timeoutId = setTimeout(() => this.close(), this.duration);
    }
  }

  private _clearTimeout() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }
}
