import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostInput {
  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  language?: string;
}
