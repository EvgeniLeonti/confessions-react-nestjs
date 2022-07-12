import { PrismaService } from 'nestjs-prisma';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { PostOrder } from './dto/post-order.input';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { CreatePostInput } from './dto/create-post.input';
import { Prisma } from '@prisma/client';
import { CreateCommentInput } from './dto/create-comment.input';
import { User } from '../users/models/user.model';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPostDraft(user, data: CreatePostInput) {
    const newPost = this.prisma.post.create({
      data: {
        published: false,
        title: data.title,
        content: data.content,
        authorId: user ? user.id : undefined,
      },
    });
    // pubSub.publish('postCreated', { postCreated: newPost });
    return newPost;
  }

  async publishPost(postId: string) {
    try {
      return await this.prisma.post.update({
        where: { id: postId },
        data: { published: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2025':
            throw new NotFoundException('Post does not exist');
        }
      } else {
        throw new Error(e);
      }
    }
  }

  async createCommentDraft(
    user: User,
    postId: string,
    data: CreateCommentInput
  ) {
    return this.prisma.comment.create({
      data: {
        published: false,
        content: data.content,
        authorId: user ? user.id : undefined,
        postId,
      },
    });
  }

  async publishComment(user: User, postId: string, commentId: string) {
    try {
      return await this.prisma.comment.update({
        where: { id: commentId },
        data: { published: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2025':
            throw new NotFoundException('Comment does not exist');
        }
      } else {
        throw new Error(e);
      }
    }
  }

  async getPublishedPosts(
    { after, before, first, last }: PaginationArgs,
    query: string,
    orderBy: PostOrder
  ) {
    const where = {
      published: true,
      title: query ? { contains: query } : undefined,
    };

    const findMany = (args) =>
      this.prisma.post.findMany({
        include: { author: true },
        where,
        orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
        ...args,
      });

    const aggregate = () => this.prisma.post.count({ where });

    const rawResult = await findManyCursorConnection(findMany, aggregate, {
      first,
      last,
      before,
      after,
    });

    const { pageInfo, totalCount, edges } = rawResult;

    return {
      items: edges.map((edge) => edge.node),
      pageInfo,
      totalCount,
    };
  }

  async getPublishedPost(postId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: { comments: true },
    });
    if (!post || !post.published) {
      throw new NotFoundException('Post does not exist');
    }
    return post;
  }
}
