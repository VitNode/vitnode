import { Module } from '@nestjs/common';
import { ShowCoreSessionResolver } from './show/show.resolver';
import { ShowCoreSessionService } from './show/show.service';

@Module({
  providers: [ShowCoreSessionResolver, ShowCoreSessionService]
})
export class DevicesModule {}
