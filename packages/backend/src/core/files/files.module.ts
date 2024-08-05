import { Global, Module } from '@nestjs/common';

import { FilesService } from './helpers/upload/upload.service';
import { ShowCoreFilesService } from './show/show.service';
import { ShowCoreFilesResolver } from './show/show.resolver';
import { CoreFilesCron } from './files.cron';
import { DownloadSecureFilesController } from './download/download.controller';

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
