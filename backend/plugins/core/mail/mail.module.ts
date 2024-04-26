import { Global, Module } from "@nestjs/common";
import { MailResolver } from "./send/mail.resolver";
import { MailService } from "./send/mail.service";

@Global()
@Module({
  providers: [MailService, MailResolver]
})
export class CoreMailModule {}
