/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as gcpLogging from '@google-cloud/logging-bunyan';
import { AppModule } from './app/app.module';
import { Request as Req } from 'express';
import BunyanLog = require('bunyan');

declare global {
  namespace Express {
    interface Request {
      // Added to express request type definition since the GCP Logging middleware attaches the logger
      // to the request object
      log?: BunyanLog;
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // [KEY DEMO] Attach middleware to the express app
  const { mw, logger } = await gcpLogging.express.middleware({
    logName: 'logName',
    level: 'debug',
  });
  app.use(mw);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
