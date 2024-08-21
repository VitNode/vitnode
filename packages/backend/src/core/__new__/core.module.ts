import { Module } from '@nestjs/common';

import { NavCoreModule } from './nav/nav.module';

@Module({
  imports: [NavCoreModule],
})
export class NewCoreModule {}
