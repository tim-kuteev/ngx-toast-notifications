import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';
import { ToastConfig } from '../toast.config';
import { Toast } from '../toast';

const nestedTransition = transition('* => *', [
  query('@*', animateChild(), {optional: true})
]);

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
  animate('{{duration}}', style({width: '100%', opacity: 1}))
]);

@Component({
  template: '<div class="toast-panel"><div *ngFor="let toast of toasts" [@nested]><div class="toast-card" [ngClass]="toast.type || \'light\'" [@shrink]><ng-template toastContent [toast]="toast"></ng-template><div class="lifetime-progress" role="progressbar" [@progress]="{value: \'*\', params: {duration: toast.duration + \'ms\'}}"></div></div></div></div>',
  styles: ['.toast-panel{z-index:900;position:fixed;bottom:0;right:0;width:100%;font-size:1rem;line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}@media(min-width: 576px){.toast-panel{bottom:1rem;right:1rem;max-width:20rem}}@media(min-width: 768px){.toast-panel{bottom:2rem}}.toast-card{position:relative;overflow:hidden;display:flex;flex-direction:column;background-clip:border-box;min-width:0;background-color:#f8f9fa;color:#212529;margin-top:1rem;box-shadow:rgba(0,0,0,.15) 0 .2rem 1.5rem .3rem}@media(min-width: 576px){.toast-card{border-radius:.15rem;box-shadow:rgba(0,0,0,.2) 0 .3rem .4rem -0.2rem,rgba(0,0,0,.15) 0 .2rem 1.5rem .3rem}}.toast-card.primary,.toast-card.secondary,.toast-card.success,.toast-card.danger,.toast-card.info,.toast-card.dark{color:#f8f9fa}.toast-card.primary .lifetime-progress,.toast-card.secondary .lifetime-progress,.toast-card.success .lifetime-progress,.toast-card.danger .lifetime-progress,.toast-card.info .lifetime-progress,.toast-card.dark .lifetime-progress{background-color:#f8f9fa}.toast-card.warning .lifetime-progress,.toast-card.light .lifetime-progress{background-color:#007bff}.toast-card.primary{background-color:#007bff}.toast-card.secondary{background-color:#868e96}.toast-card.success{background-color:#28a745}.toast-card.danger{background-color:#dc3545}.toast-card.warning{background-color:#ffc107}.toast-card.info{background-color:#17a2b8}.toast-card.light{background-color:#f8f9fa}.toast-card.dark{background-color:#343a40}.toast-card .lifetime-progress{display:flex;height:2px;width:0;border-radius:1px}'],
  animations: [
    trigger('nested', [nestedTransition]),
    trigger('shrink', [shrinkInTransition, shrinkOutTransition]),
    trigger('progress', [progressTransition]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainerComponent {

  toasts: Toast[];

  constructor(
    private _changeDetector: ChangeDetectorRef,
  ) {
  }

  add(config: ToastConfig): Toast | null {
    if (config.preventDuplicates && this._isDuplicate(config)) {
      return null;
    }
    const toast = new Toast(config, (t) => this._delete(t));
    this.toasts.push(toast);
    this._changeDetector.detectChanges();
    return toast;
  }

  private _delete(toast: Toast): void {
    this.toasts.splice(this.toasts.indexOf(toast), 1);
    this._changeDetector.detectChanges();
  }

  private _isDuplicate(config: ToastConfig): boolean {
    return this.toasts.some(t => {
      return t.type === config.type
        && t.component === config.component
        && t.caption === config.caption
        && t.text === config.text;
    })
  }
}
