import { Token } from './token.model';
import { User } from '../../users/models/user.model';

export class Auth extends Token {
  user: User;
}
