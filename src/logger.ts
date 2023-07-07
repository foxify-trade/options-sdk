export interface ILogger {
  log(msg: string, details?: object): void;
  debug(msg: string, details?: object): void;
  warn(msg: string, details?: object): void;
}
