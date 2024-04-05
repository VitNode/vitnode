import { Module } from "@nestjs/common";

import { ShowPostsForumsResolver } from "./show/show.resolver";
import { ShowPostsForumsService } from "./show/show.service";
import { DeleteForumPostsResolver } from "./delete/delete.resolver";
import { DeleteForumsPostsService } from "./delete/delete.service";
import { ShowPostsTestForumsResolver } from "./test/test.resolver";

import { CreateForumPostsResolver } from "@/plugins/forum/posts/create/create.resolver";
import { CreateForumsPostsService } from "@/plugins/forum/posts/create/create.service";

@Module({
  providers: [
    ShowPostsForumsResolver,
    ShowPostsForumsService,
    CreateForumPostsResolver,
    CreateForumsPostsService,
    DeleteForumPostsResolver,
    DeleteForumsPostsService,
    ShowPostsTestForumsResolver
  ],
  exports: [CreateForumsPostsService]
})
export class PostsForumModule {}
