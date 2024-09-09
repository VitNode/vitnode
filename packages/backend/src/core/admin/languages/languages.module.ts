import { Module } from '@nestjs/common';

import { CreateAdminCoreLanguagesResolver } from './create/create.resolver';
import { CreateAdminCoreLanguageService } from './create/create.service';
import { DeleteAdminCoreLanguagesResolver } from './delete/delete.resolver';
import { DeleteAdminCoreLanguageService } from './delete/delete.service';
import { EditAdminCoreLanguagesResolver } from './edit/edit.resolver';
import { EditAdminCoreLanguagesService } from './edit/edit.service';

@Module({
  providers: [
    CreateAdminCoreLanguageService,
    CreateAdminCoreLanguagesResolver,
    EditAdminCoreLanguagesResolver,
    EditAdminCoreLanguagesService,
    DeleteAdminCoreLanguagesResolver,
    DeleteAdminCoreLanguageService,
  ],
})
export class AdminLanguagesModule {}
