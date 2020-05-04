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
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
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
    });
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
