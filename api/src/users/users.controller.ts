import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'nestjs-prisma';
import { RestAuthGuard } from '../auth/rest-auth.guard';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from './models/user.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserInput } from './dto/update-user.input';
import { ChangePasswordInput } from './dto/change-password.input';

@ApiBearerAuth()
@Controller('users')
@ApiTags('Users')
@UseGuards(RestAuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  @Get('me')
  async getCurrentUser(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @Patch('me')
  async updateUser(
    @UserEntity() user: User,
    @Body() newUserData: UpdateUserInput
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  @Patch('me/password')
  async changePassword(
    @UserEntity() user: User,
    @Body() changePassword: ChangePasswordInput
  ) {
    return this.usersService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }
}
