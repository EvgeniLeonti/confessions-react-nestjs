import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreatePostInput {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  title: string;
}
