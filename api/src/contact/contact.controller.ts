import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { OptionalRestAuthGuard } from '../auth/rest-optional-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('contact')
@ApiTags('Contact')
export class ContactController {
  constructor(
    private configService: ConfigService,
    private contactService: ContactService,
  ) {}

  @Post()
  @UseGuards(OptionalRestAuthGuard)
  @ApiBearerAuth()
  // @ApiResponse({ type: PostObject })
  async sendMessage(
    @Request() req,
    @UserEntity() user: User,
    @Body() data: { email: string; content: string },
  ): Promise<{ success: boolean }> {
    return this.contactService.sendMessage(user, data);
  }
}
