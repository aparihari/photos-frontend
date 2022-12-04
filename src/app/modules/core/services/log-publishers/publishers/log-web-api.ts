import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LogPublisher } from '@core/common/log-publisher';
import { LogEntry } from '@core/common/log-entry';

@Injectable()
export class LogWebApi extends LogPublisher {
  constructor(private http: HttpClient) {
    super();
  }

  // Add log entry to back end data store
  log(entry: LogEntry): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    return this.http
      .post(this.location, entry, options)
      .pipe(catchError(this.handleErrors));
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all values
    return of(true);
  }

  private handleErrors(error: any): Observable<any> {
    const errors = [];
    let msg = '';

    msg = 'Status: ' + error.status;
    msg += ' - Status Text: ' + error.statusText;

    /* istanbul ignore else */
    if (error.error) {
      msg += ' - Exception Message: ' + error.error.message;
    }

    errors.push(msg);

    console.error('An error occurred', errors);

    return throwError(errors);
  }
}
