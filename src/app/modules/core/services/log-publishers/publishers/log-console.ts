import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LogPublisher } from '@core/common/log-publisher';
import { LogEntry } from '@core/common/log-entry';

@Injectable()
export class LogConsole extends LogPublisher {
  log(entry: LogEntry): Observable<boolean> {
    // Log to console
    console.log(entry.buildLogString());
    return of(true);
  }

  clear(): Observable<boolean> {
    console.clear();
    return of(true);
  }
}
