import { User } from 'src/users/models/user.model';
import { BaseModel } from 'src/common/models/base.model';
import { ApiProperty } from '@nestjs/swagger';

export class Reaction extends BaseModel {
  @ApiProperty()
  name: string;

  // @ApiProperty()
  // published: boolean;

  // @ApiProperty()
  author?: User;

  authorId?: string;
}
