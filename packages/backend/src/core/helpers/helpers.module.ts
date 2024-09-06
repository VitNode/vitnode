import { Global, Module } from '@nestjs/common';

import { StringLanguageHelper } from './string_language/helpers.service';
import { ParserStringLanguageCoreHelpersService } from './text_language/parser/parser.service';

@Global()
@Module({
  providers: [ParserStringLanguageCoreHelpersService, StringLanguageHelper],
  exports: [ParserStringLanguageCoreHelpersService, StringLanguageHelper],
})
export class GlobalCoreHelpersModule {}
