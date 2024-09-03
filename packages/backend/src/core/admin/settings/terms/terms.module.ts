import { Module } from '@nestjs/common';

import { CreateAdminTermsSettingsResolver } from './create/create.resolver';
import { CreateAdminTermsSettingsService } from './create/create.service';

@Module({
  providers: [
    CreateAdminTermsSettingsResolver,
    CreateAdminTermsSettingsService,
  ],
})
export class AdminTermsSettingsModule {}
