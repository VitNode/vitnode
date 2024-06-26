import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class DownloadAdminPluginsArgs {
  @Field(() => String)
  code: string;

  @Field(() => String, { nullable: true })
  version: string | null;

  @Field(() => Int, { nullable: true })
  version_code: number | null;
}
