type LoggerMethod = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...data: any[]): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (message?: any, ...optionalParams: any[]): void
}

export interface Logger {
  warn: LoggerMethod
  error: LoggerMethod
  debug: LoggerMethod
}

export class LoggerService implements Logger {
  public warn(message: string): void {
    console.warn(message)
  }

  public error(message: string | Error): void {
    console.error(message)
  }

  public debug(message: string | Error): void {
    // eslint-disable-next-line no-console
    console.debug(message)
  }
}
