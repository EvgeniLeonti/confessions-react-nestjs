import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Query } from '@nestjs/common';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { PostOrder, PostOrderField } from './post-order.input';
import { CommentOrderField } from './comment-order.input';

@InputType()
export class GetCommentsInput {
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
    type: CommentOrderField,
    enum: CommentOrderField,
  })
  orderByField: CommentOrderField;

  @ApiPropertyOptional()
  query: string;

  @ApiPropertyOptional()
  lang?: string;
}
