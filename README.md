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
import { ToastNotificationsModule } from 'ngx-toast-notifications';

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

#### Use service to send a toast:

```typescript
import { Toaster } from 'ngx-toast-notifications';

@Component({
  template: '<button (click)="showToast()">Show Toast</button>',
})
export class MyComponent {

  constructor(private toaster: Toaster) {
  }

  showToast() {
    this.toaster.open('Hello world!');
  }
}
```

## Demo

**[Try interactive demo on stackblitz](https://stackblitz.com/edit/ngx-toast-notifications?embed=1&file=app/app.component.ts&hideExplorer=1)**

## Configurations

### ToastNotificationsConfig

Global toast configuration, that you can specify when importing the ToastNotificationsModule.

| Parameter     | Type                          | Description                                                                        |
| ------------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| duration      | number                        | The length of time in milliseconds before dismissing (default value is 8 sec)     |
| type          | ToastType                     | Type of toast color scheme                                                         |
| component     | Type from '@angular/core'     | Custom component to replace default toast content (more on that below)             |

#### ToastType
```typescript
'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
```
Each type corresponds to [Bootstrap4](https://getbootstrap.com/docs/4.0/utilities/colors/#background-color) ones by
color. This means that if you use Bootstrap in your project, it will match the style, but you can still use
ngx-toast-notifications without Bootstrap installed.

#### Example

```typescript
  ToastNotificationsModule.forRoot({duration: 6000, type: 'primary', component: MyComponent}),
```


### ToastConfig
*extends **ToastNotificationsConfig***

Configuration for a specific toast.

| Parameter     | Type                          | Description                                                                        |
| ------------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| text          | string                        | Main text for the toast                                                            |
| caption       | string                        | Toast caption                                                                      |


#### Example

```typescript
  this.toaster.open({text: 'Pizza party', caption: 'Hooray', duration: 4000, type: 'primary', component: MyComponent});
```

## Custom Toasts

You can provide custom component to replace default toast content.

#### Simple custom toast component:

```typescript
@Component({
  template:
  '<div style="padding: 1rem;">' +
  '<div>{{toast.text}}</div>' +
  '<button (click)="toast.close()">Close</button>' +
  '</div>',
})
export class CustomToastComponent {
  @Input() toast: Toast;
}
```

#### Provide it globally as a default one:

```typescript
@NgModule({
  ...
  declarations: [
    ...
    CustomToastComponent,
  ],
  entryComponents: [
    CustomToastComponent, // this declaration is required for imperative loading
  ],
  imports: [
    ...
    ToastNotificationsModule.forRoot({component: CustomToastComponent}),
  ],
  ...
})
export class AppModule {}
```

#### or explicitly:

```typescript
  this.toaster.open(CustomToastComponent, {text: 'This is text for custom toast'});
```

#### [Stackblitz example](https://stackblitz.com/edit/ngx-toast-notifications-custom?embed=1&file=app/app.component.ts&hideExplorer=1)

## License

MIT
