import { Module } from '@nestjs/common';

import { NavCoreController } from './nav.controller';
import { ShowNavCoreService } from './show/show.service';

@Module({
  controllers: [NavCoreController],
  providers: [ShowNavCoreService],
})
export class NavCoreModule {}
