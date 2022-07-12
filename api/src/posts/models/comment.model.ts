import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { BaseModel } from 'src/common/models/base.model';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class Comment extends BaseModel {
  @ApiProperty()
  content: string;

  // @ApiProperty()
  // published: boolean;

  // @ApiProperty()
  author?: User;
}
