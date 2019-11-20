import { TestBed } from '@angular/core/testing';
import { ToastNotificationsModule } from './toast-notifications.module';
import { Toaster } from './toaster';

describe('ToastNotificationsModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastNotificationsModule]
    });
  });

  it('should provide Toaster', () => {
    expect(TestBed.get(Toaster)).toBeTruthy();
  });
});
