import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LogService } from '@core/services/log/log.service';
import { ErrorService } from '@core/services/error/error.service';
import { NotificationService } from '@core/services/notification/notification.service';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const logService = this.injector.get(LogService);
    const errorService = this.injector.get(ErrorService);
    const notifier = this.injector.get(NotificationService);

    let message: string;
    let stackTrace: any;

    if (error instanceof HttpErrorResponse) {
      // Server Error
      message = errorService.getServerMessage(error);
      stackTrace = errorService.getServerStack(error);
      notifier.showError(message);
    } else {
      // Client Error
      message = errorService.getClientMessage(error);
      stackTrace = errorService.getClientStack(error);
      notifier.showError(message);
    }

    logService.error(message);

    throw error;
  }
}
