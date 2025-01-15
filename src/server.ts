/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./types/global.d.ts" />

// Import global variables first
import { GlobalInitializer } from 'helpers/config/init-globals';

// Initialize global variables
GlobalInitializer.init();

// Import other modules
import { WebServer } from 'core/framework';
import { initServices } from 'helpers';

process.on('uncaughtException', function (err) {
  LOGGER.error('Uncaught Exception:', err);
  LOGGER.file('UNCAUGHT_EXCEPTION', err);
});

async function startServer() {
  const port = process.env.PORT || 3000;
  try {
    await initServices();
    global.APP = WebServer.app;
    APP.listen(port, () => {
      LOGGER.info(`Server running on port ${port}`);
    });
  } catch (error) {
    LOGGER.error('Failed to initialize services', error as any);
  }
}

startServer();
