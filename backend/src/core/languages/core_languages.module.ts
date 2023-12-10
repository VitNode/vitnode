import { Module } from '@nestjs/common';

import { ShowCoreLanguageService } from './show/show.service';
import { ShowCoreLanguagesResolver } from './show/show.resolver';
import { EditCoreLanguagesResolver } from './edit/edit.resolver';
import { EditCoreLanguageService } from './edit/edit.service';

@Module({
  providers: [
    ShowCoreLanguageService,
    ShowCoreLanguagesResolver,
    EditCoreLanguagesResolver,
    EditCoreLanguageService
  ]
})
export class CoreLanguagesModule {}
