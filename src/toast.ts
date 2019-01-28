import { Observable, Subject, timer } from 'rxjs';
import { ToastConfig } from './toast.config';

export class Toast extends ToastConfig {

  private readonly _closeFunction: Function;
  private readonly _onClose = new Subject<any>();
  private _isActive: boolean;

  constructor(
      config: ToastConfig,
      closeFunction: Function,
  ) {
    super();
    this.text = config.text;
    this.caption = config.caption;
    this.type = config.type;
    this.duration = config.duration;
    this._closeFunction = closeFunction;
    this._isActive = true;

    if (this.duration > 0) {
      timer(this.duration).subscribe(() => this._isActive && this.close());
    }
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
    this._isActive = false;
  }
}
