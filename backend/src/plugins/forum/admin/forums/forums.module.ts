import { Module } from "@nestjs/common";
import { CreateForumForumsService } from "./create/create.service";
import { CreateForumForumsResolver } from "./create/create.resolver";
import { ChangePositionForumForumsResolver } from "./change_position/change_position.resolver";
import { ChangePositionForumForumsService } from "./change_position/change_position.service";
import { ShowForumForumsAdminResolver } from "./show/show.resolver";
import { ShowForumForumsAdminService } from "./show/show.service";
import { EditForumForumsResolver } from "./edit/edit.resolver";
import { EditForumForumsService } from "./edit/edit.service";
import { DeleteForumForumsResolver } from "./delete/delete.resolver";
import { DeleteForumForumsService } from "./delete/delete.service";
import { ForumsForumModule } from "../../forums/forums.module";

@Module({
  providers: [
    CreateForumForumsService,
    CreateForumForumsResolver,
    ChangePositionForumForumsResolver,
    ChangePositionForumForumsService,
    ShowForumForumsAdminResolver,
    ShowForumForumsAdminService,
    EditForumForumsResolver,
    EditForumForumsService,
    DeleteForumForumsResolver,
    DeleteForumForumsService
  ],
  imports: [ForumsForumModule]
})
export class ForumForumsModule {}
