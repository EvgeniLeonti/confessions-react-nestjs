import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PatchPostInput {
  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional()
  language: string;
}
