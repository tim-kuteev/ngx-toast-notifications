import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
  OnDestroy
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ToastContainerComponent } from './toast-container/toast-container.component';

@Injectable()
export class ToastContainerService implements OnDestroy {

  private _containerElement: HTMLElement;
  private _componentRef: ComponentRef<ToastContainerComponent>;

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private _factoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector,
  ) {
  }

  ngOnDestroy() {
    this._detach();
    this._destroyContainer();
  }

  get ref(): ComponentRef<ToastContainerComponent> {
    if (!this._componentRef) {
      this._attach();
    }
    return this._componentRef;
  }

  private _attach() {
    this._detach();
    const componentFactory = this._factoryResolver.resolveComponentFactory(ToastContainerComponent);
    this._componentRef = componentFactory.create(this._injector);
    const hostView = this._componentRef.hostView as EmbeddedViewRef<any>;
    this._appRef.attachView(hostView);
    const rootNode = hostView.rootNodes[0] as HTMLElement;
    this._getContainerElement().appendChild(rootNode);
  }

  private _detach() {
    if (this._componentRef) {
      this._appRef.detachView(this._componentRef.hostView);
      this._componentRef.destroy();
      this._componentRef = null;
    }
  }

  private _getContainerElement(): HTMLElement {
    if (!this._containerElement) {
      this._containerElement = this._document.createElement('div');
      this._containerElement.classList.add('toast-container');
      this._document.body.appendChild(this._containerElement);
    }
    return this._containerElement;
  }

  private _destroyContainer() {
    if (this._containerElement && this._containerElement.parentNode) {
      this._containerElement.parentNode.removeChild(this._containerElement);
      this._containerElement = null;
    }
  }
}
