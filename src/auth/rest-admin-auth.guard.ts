import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RestAuthGuard } from './rest-auth.guard';
import { Role } from '@prisma/client';

@Injectable()
export class AdminRestAuthGuard extends RestAuthGuard {
  // Override handleRequest so it never throws an error
  handleRequest(err, user, info, context) {
    if (!user || user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Admin only');
    }

    return user;
  }
}
