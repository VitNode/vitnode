import { Module } from "@nestjs/common";

import { ShowAdminThemesService } from "./show/show.service";
import { ShowAdminThemesResolver } from "./show/show.resolver";
import { CreateAdminThemesService } from "./create/create.service";
import { CreateAdminThemesResolver } from "./create/create.resolver";
import { DeleteAdminThemesResolver } from "./delete/delete.resolver";
import { DeleteAdminThemesService } from "./delete/delete.service";
import { DownloadAdminThemesService } from "./download/download.service";
import { DownloadAdminThemesResolver } from "./download/download.resolver";
import { UploadAdminThemesResolver } from "./upload/upload.resolver";
import { UploadAdminThemesService } from "./upload/upload.service";
import { EditAdminThemesResolver } from "./edit/edit.resolver";
import { EditAdminThemesService } from "./edit/edit.service";

export interface ConfigTheme {
  author: string;
  name: string;
  support_url: string;
  version: string;
  version_code: number;
  author_url?: string;
}

@Module({
  providers: [
    ShowAdminThemesService,
    ShowAdminThemesResolver,
    CreateAdminThemesService,
    CreateAdminThemesResolver,
    DeleteAdminThemesResolver,
    DeleteAdminThemesService,
    DownloadAdminThemesService,
    DownloadAdminThemesResolver,
    UploadAdminThemesResolver,
    UploadAdminThemesService,
    EditAdminThemesResolver,
    EditAdminThemesService
  ]
})
export class AdminThemesModule {}
