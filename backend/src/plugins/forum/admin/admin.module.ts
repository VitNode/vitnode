import { Module } from "@nestjs/common";

import { ForumForumsModule } from "./forums/forums.module";

@Module({
  imports: [ForumForumsModule]
})
export class AdminForumModule {}
