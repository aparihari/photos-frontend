import { Observable } from 'rxjs';

import { LogEntry } from '@core/common/log-entry';

export abstract class LogPublisher {
  location!: string;
  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}
