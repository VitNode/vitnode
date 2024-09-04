import { Module } from '@nestjs/common';

import { CreateAdminTermsSettingsResolver } from './create/create.resolver';
import { CreateAdminTermsSettingsService } from './create/create.service';
import { EditAdminTermsSettingsResolver } from './edit/edit.resolver';
import { EditAdminTermsSettingsService } from './edit/edit.service';

@Module({
  providers: [
    CreateAdminTermsSettingsResolver,
    CreateAdminTermsSettingsService,
    EditAdminTermsSettingsResolver,
    EditAdminTermsSettingsService,
  ],
})
export class AdminTermsSettingsModule {}
