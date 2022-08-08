import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RecaptchaMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  private async verifyRecaptcha(request) {
    // const request = context.getRequest();
    const { headers, url: requestUrl } = request;

    const [, entity1, id1, entity2, id2] = requestUrl.split('/');

    // allow: /posts and /posts/{id}/comments
    if (entity1 !== 'posts') {
      return;
    }

    if (entity2 === 'reactions') {
      return;
    }

    if (!headers['recaptcha-token']) {
      throw new UnauthorizedException('You are a bot! 😈');
    }

    const http = new HttpService();
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${this.configService.get(
      'RECAPTCHA_SECRET_KEY',
    )}&response=${headers['recaptcha-token']}`;

    const res = await http.post(url).toPromise();

    if (res.data.success !== true) {
      throw new UnauthorizedException('You are a bot! 😈');
    }

    // console.log('res.data', res.data);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    await this.verifyRecaptcha(req);
    next();
  }
}
