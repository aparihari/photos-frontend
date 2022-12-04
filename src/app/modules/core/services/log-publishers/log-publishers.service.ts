import { Injectable, Inject } from '@angular/core';

import { LogPublisher } from '@core/common/log-publisher';
import { LogConsole } from '@core/services/log-publishers/publishers/log-console';
import { LogLocalStorage } from '@core/services/log-publishers/publishers/log-local-storage';
import { LogWebApi } from '@core/services/log-publishers/publishers/log-web-api';
import { LogPublisherConfig } from '@core/models/LogPublisherConfig';
import { LOG_PUBLISHER_CONFIG } from '@app/modules/core/config/LogPublishersConfig';

@Injectable()
export class LogPublishersService {
  constructor(
    @Inject(LOG_PUBLISHER_CONFIG) private configs: LogPublisherConfig[],
    private logConsole: LogConsole,
    private logLocalStorage: LogLocalStorage,
    private logWebApi: LogWebApi,
  ) {
    // Build publishers arrays
    this.buildPublishers();
  }

  // Public properties
  publishers: LogPublisher[] = [];

  // Build publishers array
  buildPublishers(): void {
    let logPublisher: LogPublisher = this.logConsole;

    for (const pub of this.configs.filter(p => p.isActive)) {
      switch (pub.loggerName) {
        case 'console':
          // Create instance of LogConsole Class
          logPublisher = this.logConsole;
          break;
        case 'localStorage':
          // Create instance of LogLocalStorage Class
          logPublisher = this.logLocalStorage;
          break;
        case 'webApi':
          // Create instance of LogWebApi Class
          logPublisher = this.logWebApi;
          break;
      }

      // Set location of logging
      logPublisher.location = pub.loggerLocation;
      // Add publisher to array
      this.publishers.push(logPublisher);
    }
  }
}
