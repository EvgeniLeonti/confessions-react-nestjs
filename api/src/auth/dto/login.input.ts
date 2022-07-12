import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import {ApiProperty} from "@nestjs/swagger";

@InputType()
export class LoginInput {
  @ApiProperty()
  @Field()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
