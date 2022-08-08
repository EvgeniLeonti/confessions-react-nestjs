import { Module } from '@nestjs/common';
import { PostsAdminController, PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PostsService],
  controllers: [PostsController, PostsAdminController],
})
export class PostsModule {}
