import { ErrorHandler, NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import {
  LOG_PUBLISHER_CONFIG,
  DEFAULT_LOG_PUBLISHERS_CONFIG,
} from './config/LogPublishersConfig';
import { AppErrorHandler } from './services/error-handler/app-error-handler';
import { ErrorService } from './services/error/error.service';
import { LogPublishersService } from './services/log-publishers/log-publishers.service';
import { LogConsole } from './services/log-publishers/publishers/log-console';
import { LogLocalStorage } from './services/log-publishers/publishers/log-local-storage';
import { LogWebApi } from './services/log-publishers/publishers/log-web-api';
import { LogService } from './services/log/log.service';
import { NotificationService } from './services/notification/notification.service';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [SharedModule, ReactiveFormsModule],
  providers: [
    NotificationService,
    ErrorService,
    LogConsole,
    LogLocalStorage,
    LogWebApi,
    LogService,
    LogPublishersService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
    {
      provide: LOG_PUBLISHER_CONFIG,
      useValue: DEFAULT_LOG_PUBLISHERS_CONFIG,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import Core modules in the AppModule only.`
      );
    }
  }
}
