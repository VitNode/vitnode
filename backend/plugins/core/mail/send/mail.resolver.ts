import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { MailArgs } from "./dto/mail.args";
import { MailService } from "./mail.service";

@Resolver()
export class MailResolver {
  constructor(private readonly service: MailService) {}

  @Mutation(() => String)
  async send_mail(@Args() args: MailArgs): Promise<String> {
    return await this.service.send(args);
  }
}
