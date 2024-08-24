import { Module } from '@nestjs/common';

import { ShowCoreLanguagesResolver } from './show/show.resolver';
import { ShowCoreLanguageService } from './show/show.service';

@Module({
  providers: [ShowCoreLanguageService, ShowCoreLanguagesResolver],
})
export class CoreLanguagesModule {}
