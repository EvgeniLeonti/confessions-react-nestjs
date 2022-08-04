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
import { CreateReactionInput } from './dto/create-reaction.input';

// import { franc, francAll } from 'franc';
// const { franc } = require('franc');
const ALL_REACTIONS = [
  { name: 'like', emoji: '👍' },
  // { name: 'dislike', emoji: '👎' },
  { name: 'laugh', emoji: '😂' },
  { name: 'love', emoji: '❤️' },
  { name: 'sad', emoji: '😢' },
  { name: 'angry', emoji: '😠' },
  { name: 'surprise', emoji: '😮' },
];

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
    const { after, before, first, last, limit } = paginationArgs;
    const findMany = (args) =>
      this.prisma.post.findMany({
        include,
        where: filter,
        orderBy: { [sort.field]: sort.direction },
        // take: limit ? Number(limit) : 10,
        ...args,
      });

    const aggregate = () => this.prisma.post.count({ where: filter });

    const rawResult = await findManyCursorConnection(findMany, aggregate, {
      first: limit ? Number(limit) : 10,
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
      include: { comments: true, reactions: false },
    });
    if (!post || !post.published) {
      throw new NotFoundException('Post does not exist');
    }
    return post;
  }

  async createReaction(
    user: User,
    browserFP: string,
    postId: string,
    data: CreateReactionInput
  ) {
    if (browserFP) {
      await this.prisma.reaction.deleteMany({
        where: {
          postId,
          browserFP,
        },
      });
    }

    // todo use browserFP as unique identifier
    return this.prisma.reaction.create({
      data: {
        name: data.name,
        browserFP,
        authorId: user?.id,
        postId,
      },
    });
  }

  async getReactionsSummary(user: User, browserFP: string, postId: string) {
    const emojiMap = ALL_REACTIONS.reduce((acc, reaction) => {
      acc[reaction.name] = reaction.emoji;
      return acc;
    }, {});

    const count = ALL_REACTIONS.reduce((acc, reaction) => {
      if (!acc[reaction.name]) {
        const emoji = emojiMap[reaction.name];
        acc[reaction.name] = {
          name: reaction.name,
          count: 0,
          emoji,
        };
      }
      return acc;
    }, {});

    const reactions = await this.prisma.reaction.findMany({
      where: { postId },
      orderBy: { id: 'desc' },
    });

    reactions.forEach((reaction) => {
      if (count[reaction.name]) {
        count[reaction.name].count++;
      }
    });

    const myReactions = reactions.filter(
      (reaction) => reaction.browserFP === browserFP
    );

    const myReaction = myReactions.length > 0 ? myReactions[0] : null;

    return { count, myReaction, postId };
  }

  async deleteReaction(user: User, browserFP: string, postId: string) {
    await this.prisma.reaction.deleteMany({
      where: {
        browserFP,
        postId,
      },
    });
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
