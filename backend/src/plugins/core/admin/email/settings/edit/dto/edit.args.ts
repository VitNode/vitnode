import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class EditAdminEmailSettingsServiceArgs {
  @Field(() => String)
  smtp_host: string;

  @Field(() => String)
  smtp_user: string;

  @Field(() => String)
  smtp_password: string;

  @Field(() => Int)
  smtp_port: number;

  @Field(() => Boolean)
  smtp_secure: boolean;
}
