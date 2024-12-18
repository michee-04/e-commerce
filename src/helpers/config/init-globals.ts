import { AsyncStorageService } from '@nodesandbox/async-storage/dist/src/index';
import { LoggerService } from '@nodesandbox/logger';
import { ConfigService } from 'core/config';

export class GlobalInitializer {
  public static init() {
    global.CONFIG = ConfigService.getInstance().getConfig();
    global.LOGGER = LoggerService.getInstance();
    global.ASYNC_STORAGE = AsyncStorageService.getInstance();

    LOGGER.info('Superglobals have been successfully initialized.');
  }
}
