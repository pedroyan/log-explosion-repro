import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Request as Req } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(@Request() req: Req) {
    req.log?.info(`This is an info logger, showing the logger is working as expected`);
    return this.appService.getData();
  }

  @Get('boom')
  kaboom(@Request() req: Req) {
    // Generate 12 MB worth of random characters efficiently
    const randomChars = Array.from({ length: 1024 * 1024 * 12 }, () => Math.random().toString(36)[2]).join('');

    req.log?.info(`I should literally take this container down and that is not ideal :(`, { randomChars });
    return 'Kaboom!';
  }
}
