import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserInput {
  @ApiPropertyOptional()
  firstname?: string;

  @ApiPropertyOptional()
  lastname?: string;
}
