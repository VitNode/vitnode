import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class EditAdminEmailSettingsServiceArgs {
  @Field(() => String)
  host: string;

  @Field(() => String)
  user: string;

  @Field(() => String)
  password: string;

  @Field(() => Int)
  port: number;

  @Field(() => Boolean)
  secure: boolean;
}
