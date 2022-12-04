import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LogLevel } from '@core/common/log-level.enum';
import { LogEntry } from '@core/common/log-entry';
import { LogPublisher } from '@core/common/log-publisher';
import { LogPublishersService } from '@core/services/log-publishers/log-publishers.service';
import { environment as env } from '@app/../environments/environment';

@Injectable()
export class LogService {
  level: LogLevel = env.logLevel;
  logWithDate: boolean = env.logWithDate;
  publishers: LogPublisher[];

  constructor(private publishersService: LogPublishersService) {
    // Set publishers
    this.publishers = this.publishersService.publishers;
  }

  private shouldLog(level: LogLevel): boolean {
    let ret = false;

    /* istanbul ignore else */
    if (
      (level >= this.level && level !== LogLevel.Off) ||
      this.level === LogLevel.All
    ) {
      ret = true;
    }

    return ret;
  }

  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    /* istanbul ignore else */
    if (this.shouldLog(level)) {
      const entry = new LogEntry();

      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;

      for (const logger of this.publishers) {
        logger.log(entry).subscribe((response) => console.log(response));
      }
    }
  }

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  clearConsoleLogs(): Observable<boolean> {
    return this.publishers[0].clear();
  }

  clearLocalStorageLogs(): Observable<boolean> {
    return this.publishers[1].clear();
  }

  clearApiLogs(): Observable<boolean> {
    return this.publishers[2].clear();
  }
}
