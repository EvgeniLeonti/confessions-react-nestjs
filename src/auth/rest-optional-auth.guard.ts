import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RestAuthGuard } from './rest-auth.guard';

@Injectable()
export class OptionalRestAuthGuard extends RestAuthGuard {
  // Override handleRequest so it never throws an error
  handleRequest(err, user, info, context) {
    return user;
  }
}
