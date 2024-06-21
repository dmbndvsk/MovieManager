import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${responseTime}ms`,
      );
    });

    next();
  }
}

/*
  LoggerMiddleware:
  - Logs the HTTP method, original URL, status code, and response time of each request.
  - Utilizes NestJS's built-in Logger service to log the details.
  - Adds a 'finish' event listener on the response to log the details after the response is sent.
*/
