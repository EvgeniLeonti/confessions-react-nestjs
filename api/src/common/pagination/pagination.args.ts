import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationArgs {
  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  after?: string;

  @ApiPropertyOptional()
  before?: string;

  @ApiPropertyOptional()
  first?: number;

  @ApiPropertyOptional()
  last?: number;

  @ApiPropertyOptional()
  limit?: number;
}
