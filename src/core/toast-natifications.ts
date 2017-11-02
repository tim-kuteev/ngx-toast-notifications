import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Toast } from './toast.interface';

@Injectable()
export class ToastNotifications extends Subject<Toast> {
}
