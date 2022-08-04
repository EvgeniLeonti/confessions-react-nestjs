import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentInput {
  @ApiProperty()
  @IsNotEmpty()
  content: string;
}
