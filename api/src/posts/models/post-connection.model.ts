import PaginatedResponse from 'src/common/pagination/pagination';
import { Post } from './post.model';

export class PostConnection extends PaginatedResponse(Post) {}
