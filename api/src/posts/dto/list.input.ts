import { InputType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum SortDirection {
  // Specifies an ascending order for a given `orderBy` argument.
  asc = 'asc',
  // Specifies a descending order for a given `orderBy` argument.
  desc = 'desc',
}

export class Sort {
  @ApiProperty()
  field: string;

  @ApiProperty()
  direction: string;

  // constructor(field: string, direction: SortDirection) {
  //   this.field = field;
  //   this.direction = direction;
  // }
  constructor(query: string) {
    const [sign, field] =
      typeof query === 'string' && query.length > 1
        ? query.split('')
        : ['-', 'id'];
    this.field = field;
    this.direction = sign === '+' ? SortDirection.asc : SortDirection.desc;
  }
}

@InputType()
export class ListInput {
  // Pagination args

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

  // Filter and sort args

  @ApiPropertyOptional()
  sort: string;

  @ApiPropertyOptional()
  query: string;

  @ApiPropertyOptional()
  lang?: string;
}
