import { Module } from '@nestjs/common';

import { ShowCoreLanguageService } from './show/show-core_languages.service';
import { ShowCoreLanguagesResolver } from './show/show-core_languages.resolver';
import { EditCoreLanguagesResolver } from './edit/edit-core_languages.resolver';
import { EditCoreLanguageService } from './edit/edit-core_languages.service';

@Module({
  providers: [
    ShowCoreLanguageService,
    ShowCoreLanguagesResolver,
    EditCoreLanguagesResolver,
    EditCoreLanguageService
  ]
})
export class CoreLanguagesModule {}
