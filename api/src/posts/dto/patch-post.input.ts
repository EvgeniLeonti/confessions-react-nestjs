import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@InputType()
export class PatchPostInput {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional()
  @Field()
  language: string;
}
