import { Module } from '@nestjs/common';

import { AdminWelcomeModule } from './admin/admin.module';

@Module({
  imports: [AdminWelcomeModule],
})
export class WelcomeModule {}
