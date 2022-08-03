import { PrismaService } from 'nestjs-prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { CreatePostInput } from './dto/create-post.input';
import { Prisma } from '@prisma/client';
import { CreateCommentInput } from './dto/create-comment.input';
import { User } from '../users/models/user.model';
import { PatchPostInput } from './dto/patch-post.input';
import guessLanguage from '../lib/guess-language';
import { Sort } from './dto/list.input';

// import { franc, francAll } from 'franc';
// const { franc } = require('franc');
@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPostDraft(user, data: CreatePostInput) {
    const language = data.language || (await this.detectLanguage(data.content));
    const newPost = this.prisma.post.create({
      data: {
        published: false,
        title: data.title,
        content: data.content,
        authorId: user ? user.id : undefined,
        language,
      },
    });
    // pubSub.publish('postCreated', { postCreated: newPost });
    return newPost;
  }

  async draftPost(postId: string) {
    try {
      return await this.prisma.post.update({
        where: { id: postId },
        data: { published: false },
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

  async patchPost(postId: string, data: PatchPostInput) {
    try {
      return await this.prisma.post.update({
        where: { id: postId },
        data: {
          content: data.content,
        },
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
        published: true, // todo debug only
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

  async getPublishedPostComments(user: User, postId: string) {
    try {
      return await this.prisma.comment.findMany({
        where: { postId, published: true },
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

  async getPosts(
    filter: any,
    include: any,
    sort: Sort,
    paginationArgs: PaginationArgs
  ) {
    const { after, before, first, last } = paginationArgs;
    const findMany = (args) =>
      this.prisma.post.findMany({
        include,
        where: filter,
        orderBy: { [sort.field]: sort.direction },
        ...args,
      });

    const aggregate = () => this.prisma.post.count({ where: filter });

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

  async getComments(
    filter: any,
    include: any,
    sort: Sort,
    paginationArgs: PaginationArgs
  ) {
    const { after, before, first, last } = paginationArgs;
    const findMany = (args) =>
      this.prisma.comment.findMany({
        include,
        where: filter,
        orderBy: { [sort.field]: sort.direction },
        ...args,
      });

    const aggregate = () => this.prisma.comment.count({ where: filter });

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

  private async detectLanguage(content: string): Promise<string> {
    return new Promise((resolve, reject) => {
      guessLanguage().detect(content, function (language) {
        resolve(language);
        console.log(
          'Detected language code of provided text is [' + language + ']'
        );
      });
    });

    // const res = guessLanguage().detect(content, function (language) {
    //   console.log(
    //     'Detected language code of provided text is [' + language + ']'
    //   );
    // });
    //
    // console.log(res);
    // return '';
    // return franc(content); // => 'heb' / 'eng' etc :https://github.com/wooorm/franc
  }
}
