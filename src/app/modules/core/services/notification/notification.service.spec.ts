import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

import { NotificationService } from './notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [Overlay, MatSnackBar, NotificationService],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show snak bar with a message', () => {
    service.showSuccess('Got results');
    expect(service.snackBar._openedSnackBarRef.containerInstance).toBeTruthy();
  });

  it('should show snak bar with an error message', () => {
    service.showError('Something went wrong!');
    expect(service.snackBar._openedSnackBarRef.containerInstance).toBeTruthy();
  });
});
