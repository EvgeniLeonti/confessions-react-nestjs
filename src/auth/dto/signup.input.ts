import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import {ApiProperty} from "@nestjs/swagger";

@InputType()
export class SignupInput {
  @ApiProperty()
  @Field()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @Field({ nullable: true })
  firstname?: string;

  @ApiProperty()
  @Field({ nullable: true })
  lastname?: string;
}
