import { Post } from 'src/posts/models/post.model';
import { BaseModel } from 'src/common/models/base.model';
import { Role } from '@prisma/client';

// @ObjectType()
export class User extends BaseModel {
  email: string;
  firstname?: string;
  lastname?: string;
  // @Field(() => Role)
  role: Role;
  posts: Post[];
  // @HideField()
  password: string;
}
