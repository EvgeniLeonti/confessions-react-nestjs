import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordInput {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
