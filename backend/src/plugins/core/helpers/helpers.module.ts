import { Global, Module } from "@nestjs/common";

import { ParserTextLanguageCoreHelpersService } from "./text_language/parser/parser.service";

@Global()
@Module({
  providers: [ParserTextLanguageCoreHelpersService],
  exports: [ParserTextLanguageCoreHelpersService]
})
export class GlobalCoreHelpersModule {}
