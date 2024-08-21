import { Module } from '@nestjs/common';

import { NavCoreModule } from './nav/nav.module';
import { SessionsCoreModule } from './sessions/sessions.module';

@Module({
  imports: [NavCoreModule, SessionsCoreModule],
})
export class NewCoreModule {}
