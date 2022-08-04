import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RestAuthGuard } from './rest-auth.guard';
import { UserEntity } from '../common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { ApiTags } from '@nestjs/swagger';
import { SignupInput } from './dto/signup.input';
import { RefreshTokenInput } from './dto/refresh-token.input';

@Controller('auth')
@ApiTags('Authentication')
// @UseGuards(RestAuthGuard)
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signup')
  async signup(@Body() data: SignupInput) {
    data.email = data.email.toLowerCase();
    const { accessToken, refreshToken } = await this.auth.createUser(data);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('login')
  async login(@Body() { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.auth.login(
      email.toLowerCase(),
      password
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('refresh')
  async refresh(@Body() { token }: RefreshTokenInput) {
    const res = this.auth.refreshToken(token);

    return res;
  }
}
