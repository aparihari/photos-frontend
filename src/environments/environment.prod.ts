import { LogLevel } from '@app/modules/core/common/log-level.enum';

export const environment = {
  production: true,
  apiEndpoint: '/api',
  logLevel: LogLevel.All,
  logWithDate: true,
  loggers: {
    console: {
      isActive: true,
    },
    localStorage: {
      isActive: true,
    },
    webApi: {
      isActive: true,
    },
  },
};
