import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsComponent } from './toasts/toasts.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ToastsComponent,
  ],
  exports: [
    ToastsComponent,
  ],
})
export class ToastNotificationClientModule {
}
