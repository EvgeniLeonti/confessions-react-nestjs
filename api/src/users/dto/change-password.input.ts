import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

@InputType()
export class ChangePasswordInput {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  oldPassword: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
