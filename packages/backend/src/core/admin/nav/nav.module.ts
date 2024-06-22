import { Module } from "@nestjs/common";

import { CreateAdminNavResolver } from "./create/create.resolver";
import { CreateAdminNavService } from "./create/create.service";
import { DeleteAdminNavResolver } from "./delete/delete.resolver";
import { DeleteAdminNavService } from "./delete/delete.service";
import { ChangePositionAdminNavService } from "./change_position/change_position.service";
import { ChangePositionAdminNavResolver } from "./change_position/change_position.resolver";
import { EditAdminNavResolver } from "./edit/edit.resolver";
import { EditAdminNavService } from "./edit/edit.service";

@Module({
  providers: [
    CreateAdminNavResolver,
    CreateAdminNavService,
    DeleteAdminNavResolver,
    DeleteAdminNavService,
    ChangePositionAdminNavService,
    ChangePositionAdminNavResolver,
    EditAdminNavResolver,
    EditAdminNavService,
  ],
})
export class AdminNavModule {}
