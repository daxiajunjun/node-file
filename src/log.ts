import * as koalog from 'koa-log4';
import logConfig from '../config/log';

koalog.configure(logConfig)

export default class log {
  public static http = koalog.getLogger('http');
  public static error = koalog.getLogger('minError');
  public static info = koalog.getLogger('maxInfo');
  public static koaLog = koalog;

  private constructor() {
  }
}