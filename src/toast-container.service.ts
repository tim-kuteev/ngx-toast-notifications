import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
  OnDestroy,
  Renderer2,
  RendererFactory2
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ToastContainerComponent } from './toast-container/toast-container.component';

const TOAST_CONTAINER_CLASS_NAME = 'toast-container';

@Injectable()
export class ToastContainerService implements OnDestroy {

  private _renderer: Renderer2;
  private _containerElement: HTMLElement;
  private _componentRef: ComponentRef<ToastContainerComponent>;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private _document: any,
    private _factoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector,
  ) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  get ref(): ComponentRef<ToastContainerComponent> {
    if (!this._componentRef) {
      this._attach();
    }
    return this._componentRef;
  }

  private get containerElement(): HTMLElement {
    if (!this._containerElement) {
      this._containerElement = this._renderer.createElement('div');
      this._renderer.addClass(this._containerElement, TOAST_CONTAINER_CLASS_NAME);
      this._renderer.appendChild(this._document.body, this._containerElement);
    }
    return this._containerElement;
  }

  ngOnDestroy() {
    this._detach();
    this._destroyContainer();
  }

  private _attach() {
    this._detach();
    const componentFactory = this._factoryResolver.resolveComponentFactory(ToastContainerComponent);
    this._componentRef = componentFactory.create(this._injector);
    const hostView = this._componentRef.hostView as EmbeddedViewRef<any>;
    this._appRef.attachView(hostView);
    const rootNode = hostView.rootNodes[0] as HTMLElement;
    this._renderer.appendChild(this.containerElement, rootNode);
  }

  private _detach() {
    if (this._componentRef) {
      this._appRef.detachView(this._componentRef.hostView);
      this._componentRef.destroy();
      this._componentRef = null;
    }
  }

  private _destroyContainer() {
    if (this._containerElement && this._containerElement.parentNode) {
      this._renderer.removeChild(this._containerElement.parentNode, this._containerElement);
      this._containerElement = null;
    }
  }
}
