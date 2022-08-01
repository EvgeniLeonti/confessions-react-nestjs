import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostOrder, PostOrderField } from './dto/post-order.input';
import { PostsService } from './posts.service';
import { GetPostsInput } from './dto/get-posts.input';
import { CreatePostInput } from './dto/create-post.input';
import { Post as PostObject } from './models/post.model';
import { PageInfo } from '../common/pagination/page-info.model';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { OptionalRestAuthGuard } from '../auth/rest-optional-auth.guard';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './models/comment.model';
import { AdminRestAuthGuard } from '../auth/rest-admin-auth.guard';
import { OrderDirection } from '../common/order/order-direction';
import { PatchPostInput } from './dto/patch-post.input';
import { GetCommentsInput } from './dto/get-comments.input';
import { CommentOrder, CommentOrderField } from './dto/comment-order.input';

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

  @Get()
  async getPublishedPosts(
    @Query() getPublishedPostsInput: GetPostsInput
  ): Promise<{ items: PostObject[]; pageInfo: PageInfo; totalCount: number }> {
    const { after, before, first, last, query, orderByField, lang } =
      getPublishedPostsInput;

    const paginationArgs = { after, before, first, last };
    const orderBy = new PostOrder();
    orderBy.field = orderByField ? orderByField : PostOrderField.createdAt;
    orderBy.direction = OrderDirection.desc; // todo - make this configurable

    const filter = {
      published: true,
      ...(query && { content: { contains: query } }),
      ...(lang && { language: lang }),
    };

    return this.postsService.getPosts(
      filter,
      { author: true },
      orderBy,
      paginationArgs
    );
  }

  @Get(':postId')
  async getPublishedPost(@Param('postId') postId: string): Promise<PostObject> {
    return this.postsService.getPublishedPost(postId);
  }

  @Post(':postId/comments')
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

  @Get(':postId/comments')
  @UseGuards(OptionalRestAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: Comment })
  @ApiImplicitParam({ name: 'postId', type: String, required: true })
  async getPostComments(
    @UserEntity() user: User,
    @Param('postId') postId: string,
    @Query() getCommentsInput: GetCommentsInput
  ): Promise<{ items: Comment[]; pageInfo: PageInfo; totalCount: number }> {
    // return this.postsService.getPublishedPostComments(user, postId);
    const { after, before, first, last, query, orderByField, lang } =
      getCommentsInput;
    const paginationArgs = { after, before, first, last };
    const orderBy = new CommentOrder();
    orderBy.field = orderByField ? orderByField : CommentOrderField.createdAt;
    orderBy.direction = OrderDirection.desc; // todo - make this configurable

    const filter = {
      // published: true,
      postId,
    };
    return this.postsService.getComments(filter, null, orderBy, paginationArgs);
  }
}

@Controller('admin/posts')
@ApiTags('Admin')
@UseGuards(AdminRestAuthGuard)
@ApiBearerAuth()
export class PostsAdminController {
  constructor(private postsService: PostsService) {}

  @Get('')
  async getAllPosts(
    @Query() input: GetPostsInput
  ): Promise<{ items: PostObject[]; pageInfo: PageInfo; totalCount: number }> {
    const { after, before, first, last, query, orderByField } = input;

    const paginationArgs = { after, before, first, last };
    const orderBy = new PostOrder();
    orderBy.field = orderByField ? orderByField : PostOrderField.createdAt;
    orderBy.direction = OrderDirection.desc; // todo - make this configurable

    const filter = {
      ...(query && { content: { contains: query } }),
    };

    return this.postsService.getPosts(
      filter,
      { author: true },
      orderBy,
      paginationArgs
    );
  }

  @Post(':postId/publish')
  @ApiResponse({ type: PostObject })
  @ApiImplicitParam({ name: 'postId', type: String, required: true })
  async publishPost(@Param('postId') postId: string): Promise<PostObject> {
    return this.postsService.publishPost(postId);
  }

  @Post(':postId/draft')
  @ApiResponse({ type: PostObject })
  @ApiImplicitParam({ name: 'postId', type: String, required: true })
  async draftPost(@Param('postId') postId: string): Promise<PostObject> {
    return this.postsService.draftPost(postId);
  }

  @Patch(':postId')
  @ApiResponse({ type: PostObject })
  @ApiImplicitParam({ name: 'postId', type: String, required: true })
  async patchPost(
    @Param('postId') postId: string,
    @Body() data: PatchPostInput
  ): Promise<PostObject> {
    return this.postsService.patchPost(postId, data);
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
}
