import { InjectionToken } from '@angular/core';

import { LogPublisherConfig } from '@core/models/LogPublisherConfig';
import { environment as env } from 'src/environments/environment';

export const DEFAULT_LOG_PUBLISHERS_CONFIG: LogPublisherConfig[] = [
  {
    loggerName: 'console',
    loggerLocation: '',
    isActive: env.loggers.console.isActive,
  },
  {
    loggerName: 'localStorage',
    loggerLocation: 'logging',
    isActive: env.loggers.localStorage.isActive,
  },
  {
    loggerName: 'webApi',
    loggerLocation: '/api/log',
    isActive: env.loggers.webApi.isActive,
  },
];

export const LOG_PUBLISHER_CONFIG: InjectionToken<string> = new InjectionToken(
  'log-publishers-config'
);
