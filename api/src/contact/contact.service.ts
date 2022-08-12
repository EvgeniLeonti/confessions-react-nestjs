import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(user, data) {
    const { email, content } = data;
    // todo send eamil
    return { success: true };
  }
}
