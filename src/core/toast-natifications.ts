import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from './toast.interface';

@Injectable()
export class ToastNotifications extends Subject<Toast> {
}
