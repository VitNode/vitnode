import { Global, Module } from '@nestjs/common';

import { StringLanguageHelper } from './string_language/helpers.service';

@Global()
@Module({
  providers: [StringLanguageHelper],
  exports: [StringLanguageHelper],
})
export class GlobalHelpersModule {}
