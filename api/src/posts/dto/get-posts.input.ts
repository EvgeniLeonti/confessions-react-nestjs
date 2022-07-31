import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Query } from '@nestjs/common';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { PostOrder, PostOrderField } from './post-order.input';

@InputType()
export class GetPostsInput {
  // PaginationArgs

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

  @ApiPropertyOptional({
    name: 'orderBy',
    type: PostOrderField,
    enum: PostOrderField,
  })
  orderByField: PostOrderField;

  @ApiPropertyOptional()
  query: string;

  @ApiPropertyOptional()
  lang?: string;
}
