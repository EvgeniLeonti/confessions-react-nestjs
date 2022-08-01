import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';
import { ApiProperty } from '@nestjs/swagger';

export enum CommentOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  published = 'published',
  content = 'content',
}

registerEnumType(CommentOrderField, {
  name: 'CommentOrderField',
  description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class CommentOrder extends Order {
  @ApiProperty({
    name: 'orderBy',
    type: CommentOrderField,
    enum: CommentOrderField,
  })
  field: CommentOrderField;
}
