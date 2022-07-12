import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostOrder, PostOrderField } from './dto/post-order.input';
import { PostsService } from './posts.service';
import { GetPublishedPostsInput } from './dto/get-published-posts.input';
import { CreatePostInput } from './dto/create-post.input';
import { Post as PostObject } from './models/post.model';
import { PageInfo } from '../common/pagination/page-info.model';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { RestAuthGuard } from '../auth/rest-auth.guard';
import { OptionalRestAuthGuard } from '../auth/rest-optional-auth.guard';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './models/comment.model';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseGuards(OptionalRestAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: PostObject })
  async createPostDraft(
    @UserEntity() user: User,
    @Body() data: CreatePostInput
  ): Promise<PostObject> {
    return this.postsService.createPostDraft(user, data);
  }

  @Post(':postId/publish')
  @ApiResponse({ type: PostObject })
  @ApiImplicitParam({ name: 'postId', type: String, required: true })
  async publishPost(@Param('postId') postId: string): Promise<PostObject> {
    return this.postsService.publishPost(postId);
  }

  @Post(':postId/comment')
  @UseGuards(OptionalRestAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: Comment })
  @ApiImplicitParam({ name: 'postId', type: String, required: true })
  async createComment(
    @UserEntity() user: User,
    @Param('postId') postId: string,
    @Body() data: CreateCommentInput
  ): Promise<Comment> {
    return this.postsService.createCommentDraft(user, postId, data);
  }

  @Post(':postId/comment/:commentId/publish')
  @ApiResponse({ type: PostObject })
  @ApiImplicitParam({ name: 'postId', type: String, required: true })
  @ApiImplicitParam({ name: 'commentId', type: String, required: true })
  async publishComment(
    @UserEntity() user: User,
    @Param('postId') postId: string,
    @Param('commentId') commentId: string
  ): Promise<Comment> {
    return this.postsService.publishComment(user, postId, commentId);
  }

  @Get()
  async getPublishedPosts(
    @Query() getPublishedPostsInput: GetPublishedPostsInput
  ): Promise<{ items: PostObject[]; pageInfo: PageInfo; totalCount: number }> {
    const { after, before, first, last, query, orderByField } =
      getPublishedPostsInput;

    const paginationArgs = { after, before, first, last };
    const orderBy = new PostOrder();
    orderBy.field = orderByField ? orderByField : PostOrderField.createdAt;

    return this.postsService.getPublishedPosts(paginationArgs, query, orderBy);
  }

  @Get(':postId')
  async getPublishedPost(@Param('postId') postId: string): Promise<PostObject> {
    return this.postsService.getPublishedPost(postId);
  }
}
