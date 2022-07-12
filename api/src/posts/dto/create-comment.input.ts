import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateCommentInput {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  content: string;
}
