import {Component} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs/Observable';
import {ToastNotificationConfig} from '../../core/toast-notification.config';
import {ToastNotifications} from '../../core/toast-natifications';
import {Toast} from '../../core/toast.interface';
import 'rxjs/add/observable/timer';

const shrinkInTransition = transition('void => *', [
  style({height: 0, opacity: 0, 'margin-top': 0}),
  animate(200, style({height: '*', opacity: 1, 'margin-top': '1rem'}))
]);

const shrinkOutTransition = transition('* => void', [
  style({height: '!', opacity: 1, 'margin-top': '1rem'}),
  animate(150, style({height: 0, opacity: 0, 'margin-top': 0}))
]);

const progressTransition = transition('void => *', [
  style({width: 0, opacity: 0}),
  animate('{{lifetime}}', style({width: '100%', opacity: 1}))
]);

@Component({
  selector: 'toast-notifications',
  template: '<div class="toast-panel"><div *ngFor="let toast of activeToasts" class="toast-card" [@shrink] [ngClass]="toast.type"><div class="close-button" (click)="close(toast)">&times;</div><div class="card-body text-left"><div *ngIf="toast.caption" class="title">{{toast.caption}}</div><div>{{toast.text}}</div></div><div class="lifetime-progress" role="progressbar" [@progress]="animationOptions(toast)"></div></div></div>',
  styles: ['.toast-panel{z-index:900;position:fixed;right:1rem;bottom:1rem;width:90%;max-width:20rem;font-size:1rem;line-height:1.5;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif}@media (min-width: 768px){.toast-panel{bottom:2rem}}.toast-card{position:relative;display:flex;flex-direction:column;background-clip:border-box;min-width:0;border-radius:0.1rem;background-color:#f8f9fa;color:#212529;margin-top:1rem;box-shadow:rgba(0,0,0,0.3) 0 0.3rem 0.4rem -0.2rem,rgba(0,0,0,0.15) 0 0.2rem 1.5rem 0.3rem}.toast-card.primary,.toast-card.secondary,.toast-card.success,.toast-card.danger,.toast-card.info,.toast-card.dark{color:#f8f9fa}.toast-card.primary .lifetime-progress,.toast-card.secondary .lifetime-progress,.toast-card.success .lifetime-progress,.toast-card.danger .lifetime-progress,.toast-card.info .lifetime-progress,.toast-card.dark .lifetime-progress{background-color:#f8f9fa}.toast-card.warning .lifetime-progress,.toast-card.light .lifetime-progress{background-color:#007bff}.toast-card.primary{background-color:#007bff}.toast-card.secondary{background-color:#868e96}.toast-card.success{background-color:#28a745}.toast-card.danger{background-color:#dc3545}.toast-card.warning{background-color:#ffc107}.toast-card.info{background-color:#17a2b8}.toast-card.light{background-color:#f8f9fa}.toast-card.dark{background-color:#343a40}.toast-card .close-button{border:0;background:none;position:absolute;top:.3rem;right:.4rem;line-height:.6;font-weight:bold;opacity:.3;color:inherit;cursor:pointer}.toast-card .close-button:hover{opacity:1}.toast-card .card-body{padding:.5rem;font-size:.8rem}.toast-card .card-body .title{font-weight:bold}.toast-card .lifetime-progress{display:flex;height:2px;border-radius:1px;margin-bottom:-1px}'],
  animations: [
    trigger('shrink', [shrinkInTransition, shrinkOutTransition]),
    trigger('progress', [progressTransition]),
  ]
})
export class ToastsComponent {

  activeToasts: Set<Toast> = new Set<Toast>();

  constructor(
      private config: ToastNotificationConfig,
      private toastNotifications: ToastNotifications) {
    this.subscribe();
  }

  close(toast: Toast) {
    this.activeToasts.delete(toast);
  }

  animationOptions(toast: Toast): any {
    return {value: '*', params: {lifetime: `${toast.lifetime}ms`}};
  }

  private subscribe() {
    this.toastNotifications.subscribe(toast => {
      toast.lifetime = Math.ceil(toast.lifetime && toast.lifetime > -1 ? toast.lifetime : this.config.lifetime);
      this.activeToasts.add(toast);
      toast.lifetime !== 0 && Observable.timer(toast.lifetime).subscribe(() => this.close(toast));
    });
  }
}
