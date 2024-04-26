import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class MailArgs {
  @Field(() => String)
  receiver_address: string;

  @Field(() => String)
  subject: string;

  @Field(() => String)
  content: string;
}
