import { Resolver, Mutation, Args } from "@nestjs/graphql";

import { MailArgs } from "./dto/mail.args";
import { MailService } from "./mail.service";

@Resolver()
export class MailResolver {
  constructor(private readonly service: MailService) {}

  @Mutation(() => String)
  async core_mail_send(@Args() args: MailArgs): Promise<string> {
    return this.service.send(args);
  }
}
