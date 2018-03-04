# Angular2+ Toast Notifications

It's a simple library for Angular applications which provides the easy way to display toast notifications.

![Toast Sample](https://i.imgur.com/yj5LT3f.png)

## Install

```bash
npm i ngx-toast-notifications --save
```
**@angular/animations** package should also be installed.

## Simple usage

#### Import modules:

```typescript
import {ToastNotificationClientModule, ToastNotificationCoreModule} from "ngx-toast-notifications";

@NgModule({
  ...
  imports: [
    ...
    BrowserAnimationsModule, // required
    ToastNotificationCoreModule.forRoot(), // core module
    ToastNotificationClientModule, // component module
  ],
  ...
})
export class AppModule {}
```

Component module is set separately for purpose of AOT compilation and lazy initialization. It can be imported only in
the module where you intend to use toast notifications.

#### Add a notification directive in the root template of the module:

```html
<toast-notifications></toast-notifications>
```
The best way is to add it on the top of the AppComponent template so that notifications are displayed over all pages of
the application.

#### Use service to send a toast:

```typescript
import {ToastNotifications} from "ngx-toast-notifications";

...
export class MyComponent implements OnInit {

  constructor(private toasts: ToastNotifications) {
  }

  ngOnInit(): void {
    this.toasts.next({text: 'Hello world!'});
  }
}
```

## Demo

#### [Try interactive demo on stackblitz](https://stackblitz.com/edit/ngx-toast-notifications?embed=1&file=app/app.component.ts)

## Configurations

#### Lifetime

When importing the core module, you can specify the lifetime of the toasts (the time that they remain on the screen
before disappearing). By default it's 8 seconds.
```typescript
  ToastNotificationCoreModule.forRoot({lifetime: 6000}), // lifetime is set to 6 seconds
```
Also you can specify lifetime for a particular toast:
```typescript
  this.toasts.next({text: 'Reed fast!', lifetime: 3000});
```

#### Type

```typescript
  this.toasts.next({text: 'Hooray!', type: 'primary'});
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
