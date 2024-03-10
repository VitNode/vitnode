import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class CheckDownloadAdminPluginsArgs {
  @Field(() => String)
  code: string;
}
