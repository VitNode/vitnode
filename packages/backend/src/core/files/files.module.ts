import { Global, Module } from '@nestjs/common';

import { DownloadSecureFilesController } from './download/download.controller';
import { CoreFilesCron } from './files.cron';
import { FilesService } from './helpers/upload/upload.service';
import { ShowCoreFilesResolver } from './show/show.resolver';
import { ShowCoreFilesService } from './show/show.service';

@Module({
  providers: [ShowCoreFilesService, ShowCoreFilesResolver, CoreFilesCron],
})
export class CoreFilesModule {}

@Global()
@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [DownloadSecureFilesController],
})
export class GlobalCoreFilesModule {}
