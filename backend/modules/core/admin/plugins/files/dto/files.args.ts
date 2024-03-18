import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class FilesAdminPluginsArgs {
  @Field(() => String)
  code: string;
}
