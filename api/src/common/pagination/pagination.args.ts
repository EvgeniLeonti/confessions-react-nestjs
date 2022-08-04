import { ArgsType } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';

@ArgsType()
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
