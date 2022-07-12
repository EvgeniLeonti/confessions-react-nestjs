import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { PostsAdminController, PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [],
  providers: [PostsResolver, PostsService],
  controllers: [PostsController, PostsAdminController],
})
export class PostsModule {}
