import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@InputType()
export class CreatePostInput {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional()
  @Field()
  title: string;
}
