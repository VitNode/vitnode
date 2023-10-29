import { Module } from '@nestjs/common';

import { ShowCoreLanguageService } from './show/show-core_languages.service';
import { ShowCoreLanguagesResolver } from './show/show-core_languages.resolver';

@Module({
  providers: [ShowCoreLanguageService, ShowCoreLanguagesResolver]
})
export class CoreLanguagesModule {}
