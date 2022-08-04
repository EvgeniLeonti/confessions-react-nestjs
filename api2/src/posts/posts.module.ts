import { Module } from '@nestjs/common';
import { PostsAdminController, PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [],
  providers: [PostsService],
  controllers: [PostsController, PostsAdminController],
})
export class PostsModule {}
