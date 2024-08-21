import { Module } from '@nestjs/common';

import { NavController } from './nav.controller';
import { ShowCoreNavService } from './show/show.service';

@Module({
  controllers: [NavController],
  providers: [ShowCoreNavService],
})
export class NavCoreModule {}
