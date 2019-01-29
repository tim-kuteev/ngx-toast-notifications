# Angular Toast Notifications

It's a simple library for [Angular](https://github.com/angular/angular) applications which provides the easy way to display toast notifications.

![Toast Sample](https://i.imgur.com/yj5LT3f.png)

## Install

```bash
npm install --save ngx-toast-notifications
```
**@angular/animations** package should also be installed.

## Simple usage

#### Import modules:

```typescript
import {ToastNotificationsModule} from "ngx-toast-notifications";

@NgModule({
  ...
  imports: [
    ...
    BrowserAnimationsModule, // required
    ToastNotificationsModule.forRoot(),
  ],
  ...
})
export class AppModule {}
```

Component module is set separately for purpose of AOT compilation and lazy initialization. It can be imported only in
the module where you intend to use toast notifications.

#### Use service to send a toast:

```typescript
import {Toaster} from "ngx-toast-notifications";

@Component({
  template: '<button (click)="showToast()">Show Toast</button>',
})
export class MyComponent {

  constructor(private toaster: Toaster) {
  }

  showToast() {
    this.toaster.open({text: 'Hello world!'});
  }
}
```

## Demo

**[Try interactive demo on stackblitz](https://stackblitz.com/edit/ngx-toast-notifications?embed=1&file=app/app.component.ts)**

## Configurations

#### Toast duration

When importing the core module, you can specify the duration of the toasts (the time they remain on the screen
before disappearing). By default it's 8 seconds.
```typescript
  ToastNotificationsModule.forRoot({duration: 6000}), // lifetime is set to 6 seconds
```
Also you can specify duration for a particular toast:
```typescript
  this.toaster.open({text: 'Reed fast!', duration: 3000});
```

#### Type

```typescript
  this.toaster.open({text: 'Hooray!', type: 'primary'});
```

There are eight types of toasts so far.
```typescript
'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
```
Each type corresponds to [Bootstrap4](https://getbootstrap.com/docs/4.0/utilities/colors/#background-color) ones by
color. This means that if you use Bootstrap in your project, it will match the style, but you can still use
ngx-toast-notifications without Bootstrap installed.

## License

MIT
