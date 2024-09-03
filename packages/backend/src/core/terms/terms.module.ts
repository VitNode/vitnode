import { Module } from '@nestjs/common';

import { ShowCoreTermsResolver } from './show/show.resolver';
import { ShowCoreTermsService } from './show/show.service';

@Module({
  providers: [ShowCoreTermsResolver, ShowCoreTermsService],
})
export class TermsCoreModule {}
