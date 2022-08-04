import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from '../../common/models/base.model';
import { User } from '../../users/models/user.model';

export class Reaction extends BaseModel {
  @ApiProperty()
  name: string;

  // @ApiProperty()
  // published: boolean;

  // @ApiProperty()
  author?: User;

  authorId?: string;
}
