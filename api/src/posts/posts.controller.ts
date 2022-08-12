import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
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
import { PatchPostInput } from './dto/patch-post.input';
import { ListInput, Sort } from './dto/list.input';
import { CreateReactionInput } from './dto/create-reaction.input';
import { Reaction } from './models/reaction.model';
import { ConfigService } from '@nestjs/config';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    private configService: ConfigService,
    private postsService: PostsService,
  ) {}

  @Post()
  @UseGuards(OptionalRestAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: PostObject })
  async createPostDraft(
    @Request() req,
    @UserEntity() user: User,
    @Body() data: CreatePostInput,
  ): Promise<PostObject> {
    return this.postsService.createPostDraft(user, data);
  }

  @Get()
  async listPublishedPosts(
    @Query() input: ListInput,
  ): Promise<{ items: PostObject[]; pageInfo: PageInfo; totalCount: number }> {
    const { after, before, first, last, limit, query, lang, exclude } = input;

    const paginationArgs = {
      after: after || undefined,
      before: before || undefined,
      first: first || undefined,
      last: last || undefined,
      limit: limit || undefined,
    };

    const filter = {
      published: true,
      ...(query && {
        content: {
          contains: decodeURIComponent(query),
          mode: 'insensitive', // todo seems like this is not working
        },
      }),
      ...(lang && { language: lang }),
      ...(exclude && {
        NOT: {
          id: { in: exclude },
        },
      }),
    };

    const include = {
      author: true,
    };

    return this.postsService.getPosts(
      filter,
      include,
      new Sort(input.sort),
      paginationArgs,
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
    @Request() req,
    @UserEntity() user: User,
    @Param('postId') postId: string,
    @Body() data: CreateCommentInput,
  ): Promise<Comment> {
    if (data.content.trim().length < 1) {
      throw new BadRequestException('Comment content is required');
    }
    return this.postsService.createCommentDraft(user, postId, data);
  }

  @Get(':postId/comments')
  @UseGuards(OptionalRestAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: Comment })
  @ApiImplicitParam({ name: 'postId', type: String, required: true })
  async listComments(
    @UserEntity() user: User,
    @Param('postId') postId: string,
    @Query() input: ListInput,
  ): Promise<{ items: Comment[]; pageInfo: PageInfo; totalCount: number }> {
    // return this.postsService.getPublishedPostComments(user, postId);
    const { after, before, first, last, limit, query, lang } = input;

    const paginationArgs = {
      after: after || undefined,
      before: before || undefined,
      first: first || undefined,
      last: last || undefined,
      limit: limit || undefined,
    };

    const filter = {
      // published: true,
      postId,
    };
    return this.postsService.getComments(
      filter,
      null,
      new Sort(input.sort),
      paginationArgs,
    );
  }

  @Get(':postId/comments/count')
  @UseGuards(OptionalRestAuthGuard)
  @ApiBearerAuth()
  // @ApiResponse({ type: Comment })
  @ApiImplicitParam({ name: 'postId', type: String, required: true })
  async countComments(
    @UserEntity() user: User,
    @Param('postId') postId: string,
  ): Promise<{ count: number }> {
    return await this.postsService.countComments(postId);
  }

  @Post(':postId/reactions')
  @UseGuards(OptionalRestAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: Reaction })
  @ApiImplicitParam({ name: 'postId', type: String, required: true })
  async createReaction(
    @Request() req,
    @UserEntity() user: User,
    @Param('postId') postId: string,
    @Body() data: CreateReactionInput,
    @Headers() headers,
  ): Promise<Reaction> {
    if (data.name.trim().length < 1) {
      throw new BadRequestException('Reaction name is required');
    }
    const browserFP = headers['browser-fingerprint'];
    return this.postsService.createReaction(user, browserFP, postId, data);
  }

  @Get(':postId/reactions/summary')
  @UseGuards(OptionalRestAuthGuard)
  @ApiBearerAuth()
  // @ApiResponse({ type: Comment })
  @ApiImplicitParam({ name: 'postId', type: String, required: true })
  async getReactionsSummary(
    @UserEntity() user: User,
    @Param('postId') postId: string,
    @Query() input: ListInput,
    @Headers() headers,
  ): Promise<any> {
    const browserFP = headers['browser-fingerprint'];
    return this.postsService.getReactionsSummary(user, browserFP, postId);
  }

  @Delete(':postId/reactions')
  @UseGuards(OptionalRestAuthGuard)
  @ApiBearerAuth()
  // @ApiResponse({ type: Comment })
  @ApiImplicitParam({ name: 'postId', type: String, required: true })
  async deleteReaction(
    @UserEntity() user: User,
    @Param('postId') postId: string,
    @Headers() headers,
  ): Promise<any> {
    const browserFP = headers['browser-fingerprint'];
    if (!browserFP && !user) {
      throw new BadRequestException('User or browser fingerprint is required');
    }
    return this.postsService.deleteReaction(user, browserFP, postId);
  }
}

@Controller('admin/posts')
@ApiTags('Admin')
@UseGuards(AdminRestAuthGuard)
@ApiBearerAuth()
export class PostsAdminController {
  constructor(private postsService: PostsService) {}

  @Get('')
  async listAllPosts(
    @Query() input: ListInput,
  ): Promise<{ items: PostObject[]; pageInfo: PageInfo; totalCount: number }> {
    const { after, before, first, last, limit, query, lang } = input;
    const paginationArgs = { after, before, first, last, limit };

    const filter = {
      // published: true,
      ...(query && { content: { contains: query } }),
    };
    return this.postsService.getPosts(
      filter,
      { author: true },
      new Sort(input.sort),
      paginationArgs,
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
    @Body() data: PatchPostInput,
  ): Promise<PostObject> {
    return this.postsService.patchPost(postId, data);
  }

  @Post(':postId/comments/:commentId/publish')
  @ApiResponse({ type: PostObject })
  @ApiImplicitParam({ name: 'postId', type: String, required: true })
  @ApiImplicitParam({ name: 'commentId', type: String, required: true })
  async publishComment(
    @UserEntity() user: User,
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ): Promise<Comment> {
    return this.postsService.publishComment(user, postId, commentId);
  }
}
