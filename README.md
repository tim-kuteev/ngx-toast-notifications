# Angular Toast Notifications

A lightweight and simple to use library for [Angular](https://github.com/angular/angular) applications that provides an easy way to display toast notifications.

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
    ToastNotificationsModule,
  ],
  ...
})
export class AppModule {}
```

#### Use the Toaster service to send a toast:

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

**[Try interactive demo on stackblitz](https://stackblitz.com/edit/ngx-toast-notifications?embed=1&file=app/app.component.ts)**

## Configurations

Toasts scale to match the size of the page content by using relative font sizing. To change the size of the toast
simply change font size of the **html** element.

`Toaster.open` returns a `Toast` object. This can be used to close toast or subscribe for an event when the toast is closed.

```typescript
const toast = this.toaster.open('Message');

toast.onClose.subscribe((result) => {
  // toast closed
});

toast.close('success');
```

### ToastNotificationsConfig

Global toast configuration that you can specify when importing the ToastNotificationsModule.

| Parameter         | Type                          | Description                                                                                                         |
| ----------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| position          | **ToastPosition**             | The position to place the toasts on the screen (default value is 'bottom-right')                                    |
| autoClose         | boolean                       | Determines if the toasts will automatically close after the specified time (default value is true)                  |
| duration          | number                        | The length of time in milliseconds before dismissing (default is 8 sec)                                             |
| type              | **ToastType**                 | Color scheme type of the toasts                                                                                     |
| component         | **Type** from '@angular/core' | Custom component to replace default toast content (more on that below)                                              |
| preventDuplicates | boolean                       | Determines if the toast will be rejected when the one with same content is already present (default value is false) |

#### ToastPosition
```typescript
'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
```

#### ToastType
```typescript
'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
```
Each type corresponds to [Bootstrap4](https://getbootstrap.com/docs/4.0/utilities/colors/#background-color) ones by
color. This means that if you use Bootstrap in your project, it will match the style, but you can still use
ngx-toast-notifications without Bootstrap installed.

#### Example

```typescript
imports: [
  ToastNotificationsModule.forRoot({duration: 6000, type: 'primary'})
],
```

#### or

```typescript
imports: [
  ToastNotificationsModule,
],
providers: [
  {provide: TOAST_NOTIFICATIONS_CONFIG, useValue: {duration: 6000, type: 'primary'}},
]
```

### ToastConfig
*extends **ToastNotificationsConfig***

Configuration for a specific toast.

| Parameter         | Type                          | Description                                                                                                         |
| ----------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| text              | string                        | Main text for the toast                                                                                             |
| caption           | string                        | Toast caption                                                                                                       |
| position          | **ToastPosition**             | The position to place the toast on the screen (default value is 'bottom-right')                                     |
| autoClose         | boolean                       | Determines if the toast will automatically close after the specified time (default value is true)                   |
| duration          | number                        | The length of time in milliseconds before dismissing (default is 8 sec)                                             |
| type              | **ToastType**                 | Color scheme type of the toast                                                                                      |
| component         | **Type** from '@angular/core' | Custom component to replace default toast content (more on that below)                                              |
| preventDuplicates | boolean                       | Determines if the toast will be rejected when the one with same content is already present (default value is false) |


#### Example

```typescript
this.toaster.open({text: 'Pizza party', caption: 'Hooray', duration: 4000, type: 'primary', component: MyCustomComponent});
```

## Custom Toasts

You can provide a given component to replace default toast content.

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

#### Declaration:

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
  ...
})
export class AppModule {}
```

#### Provide it globally as a default:

```typescript
ToastNotificationsModule.forRoot({component: CustomToastComponent}),
```

#### or explicitly:

```typescript
this.toaster.open(CustomToastComponent, {text: 'This is text for custom toast'});
```

**[Stackblitz demo of Custom Toast](https://stackblitz.com/edit/ngx-toast-notifications-custom?embed=1&file=app/app.module.ts&hideExplorer=1)**

## License

MIT
