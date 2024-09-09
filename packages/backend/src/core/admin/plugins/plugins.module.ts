import { Module } from '@nestjs/common';

import { CreateAdminPluginsResolver } from './create/create.resolver';
import { CreateAdminPluginsService } from './create/create.service';
import { DeleteAdminPluginsResolver } from './delete/delete.resolver';
import { DeleteAdminPluginsService } from './delete/delete.service';
import { DownloadAdminPluginsResolver } from './download/download.resolver';
import { DownloadAdminPluginsService } from './download/download.service';
import { EditAdminPluginsResolver } from './edit/edit.resolver';
import { EditAdminPluginsService } from './edit/edit.service';
import { ChangeFilesAdminPluginsService } from './helpers/files/change/change.service';
import { CreateFilesAdminPluginsService } from './helpers/files/create/create-files.service';
import { AdminNavPluginsModule } from './nav/nav-plugins.module';
import { ShowAdminPluginsResolver } from './show/show.resolver';
import { ShowAdminPluginsService } from './show/show.service';
import { UploadAdminPluginsResolver } from './upload/upload.resolver';
import { UploadAdminPluginsService } from './upload/upload.service';

@Module({
  providers: [
    ShowAdminPluginsService,
    ShowAdminPluginsResolver,
    CreateAdminPluginsResolver,
    CreateAdminPluginsService,
    DeleteAdminPluginsResolver,
    DeleteAdminPluginsService,
    CreateFilesAdminPluginsService,
    ChangeFilesAdminPluginsService,
    DownloadAdminPluginsResolver,
    DownloadAdminPluginsService,
    UploadAdminPluginsResolver,
    UploadAdminPluginsService,
    EditAdminPluginsResolver,
    EditAdminPluginsService,
  ],
  imports: [AdminNavPluginsModule],
})
export class AdminPluginsModule {}
