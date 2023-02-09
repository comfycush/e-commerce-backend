import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AccessLogMiddleware implements NestMiddleware {
  private logger = new Logger('AccessLog');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, baseUrl, url } = request;

    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;

      this.logger.log(
        `[${method}: ${baseUrl}] - ${statusCode} [${ip}: ${userAgent}] ${url}`,
      );
    });

    next();
  }
}
