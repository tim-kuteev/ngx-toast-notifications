# Angular2+ Toast Notifications

Toast notifications for Angular applications.

Full instruction is coming soon.

## Install
```bash
npm i ngx-toast-notifications --save
```

## Simple usage

Import modules:
```typescript
import {ToastNotificationClientModule, ToastNotificationCoreModule} from "ngx-toast-notifications";

@NgModule({
  ...
  imports: [
    ...
    BrowserAnimationsModule, // required
    ToastNotificationCoreModule.forRoot(), // core module
    ToastNotificationClientModule, // component aot module
  ],
  ...
})
export class AppModule {}
```

Add notification component where it's needed:
```html
<toast-notifications></toast-notifications>
```

Use service to send toast: 
```typescript
import {ToastNotifications} from "ngx-toast-notifications";

...
export class MyComponent implements OnInit {

  constructor(
    private toasts: ToastNotifications) {
  }

  ngOnInit(): void {
    this.toasts.next({text: 'Hello world!'});
  }
}
```
