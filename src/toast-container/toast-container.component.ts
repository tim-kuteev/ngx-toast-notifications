import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';
import { ToastConfig } from '../toast.config';
import { Toast } from '../toast';
import { ToastPosition } from '../toast-notifications.config';

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
  template: `<ng-template #toastPanel let-toasts><div *ngFor="let toast of toasts" [@nested]><div class="toast-card" [ngClass]="toast.type || 'light'" [@shrink]><ng-template toastContent [toast]="toast"></ng-template><div *ngIf="toast.autoClose" class="lifetime-progress" role="progressbar" [@progress]="{value: '*', params: {duration: toast.duration + 'ms'}}"></div></div></div></ng-template><div class="toast-panel top-left"><ng-container *ngTemplateOutlet="toastPanel; context: {$implicit: tl}"></ng-container></div><div class="toast-panel top-center"><ng-container *ngTemplateOutlet="toastPanel; context: {$implicit: tc}"></ng-container></div><div class="toast-panel top-right"><ng-container *ngTemplateOutlet="toastPanel; context: {$implicit: tr}"></ng-container></div><div class="toast-panel bottom-left"><ng-container *ngTemplateOutlet="toastPanel; context: {$implicit: bl}"></ng-container></div><div class="toast-panel bottom-center"><ng-container *ngTemplateOutlet="toastPanel; context: {$implicit: bc}"></ng-container></div><div class="toast-panel bottom-right"><ng-container *ngTemplateOutlet="toastPanel; context: {$implicit: br}"></ng-container></div>`,
  styles: ['.toast-panel{z-index:900;position:fixed;width:100%;font-size:1rem;line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}@media(max-width: 575px){.toast-panel{bottom:0;right:0;left:0}}@media(min-width: 576px){.toast-panel{max-width:20rem}.toast-panel.top-left{top:0;left:1rem}.toast-panel.top-center{top:0;left:50%;margin-left:-10rem}.toast-panel.top-right{top:0;right:1rem}.toast-panel.bottom-left{bottom:1rem;left:1rem}.toast-panel.bottom-center{bottom:1rem;left:50%;margin-left:-10rem}.toast-panel.bottom-right{bottom:1rem;right:1rem}}.toast-card{position:relative;overflow:hidden;display:flex;flex-direction:column;background-clip:border-box;min-width:0;background-color:#f8f9fa;color:#212529;margin-top:1rem;box-shadow:rgba(0,0,0,.15) 0 .2rem 1.5rem .3rem}@media(min-width: 576px){.toast-card{border-radius:.15rem;box-shadow:rgba(0,0,0,.2) 0 .3rem .4rem -0.2rem,rgba(0,0,0,.15) 0 .2rem 1.5rem .3rem}}.toast-card.primary,.toast-card.secondary,.toast-card.success,.toast-card.danger,.toast-card.info,.toast-card.dark{color:#f8f9fa}.toast-card.primary .lifetime-progress,.toast-card.secondary .lifetime-progress,.toast-card.success .lifetime-progress,.toast-card.danger .lifetime-progress,.toast-card.info .lifetime-progress,.toast-card.dark .lifetime-progress{background-color:#f8f9fa}.toast-card.warning .lifetime-progress,.toast-card.light .lifetime-progress{background-color:#007bff}.toast-card.primary{background-color:#007bff}.toast-card.secondary{background-color:#868e96}.toast-card.success{background-color:#28a745}.toast-card.danger{background-color:#dc3545}.toast-card.warning{background-color:#ffc107}.toast-card.info{background-color:#17a2b8}.toast-card.light{background-color:#f8f9fa}.toast-card.dark{background-color:#343a40}.toast-card .lifetime-progress{display:flex;height:2px;width:0;border-radius:1px}'],
  animations: [
    trigger('nested', [nestedTransition]),
    trigger('shrink', [shrinkInTransition, shrinkOutTransition]),
    trigger('progress', [progressTransition]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainerComponent {

  tl: Toast[] = [];
  tc: Toast[] = [];
  tr: Toast[] = [];
  bl: Toast[] = [];
  bc: Toast[] = [];
  br: Toast[] = [];

  constructor(
    private _changeDetector: ChangeDetectorRef,
  ) {
  }

  add(config: ToastConfig): Toast | null {
    const collection = this._getCollection(config.position);
    if (config.preventDuplicates && this._isDuplicate(collection, config)) {
      return null;
    }
    const toast = new Toast(config, (t) => this._delete(collection, t));
    collection.push(toast);
    this._changeDetector.detectChanges();
    return toast;
  }

  private _delete(collection: Toast[], toast: Toast): void {
    collection.splice(collection.indexOf(toast), 1);
    this._changeDetector.detectChanges();
  }

  private _isDuplicate(collection: Toast[], config: ToastConfig): boolean {
    return collection.some(t => {
      return t.type === config.type
        && t.component === config.component
        && t.caption === config.caption
        && t.text === config.text;
    })
  }

  private _getCollection(position: ToastPosition): Toast[] {
    switch (position) {
      case 'top-left':
        return this.tl;
      case 'top-center':
        return this.tc;
      case 'top-right':
        return this.tr;
      case 'bottom-left':
        return this.bl;
      case 'bottom-center':
        return this.bc;
      default:
        return this.br;
    }
  }
}
