import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class DownloadAdminPluginsArgs {
  @Field(() => String)
  code: string;

  @Field(() => String, { nullable: true })
  version?: string;

  @Field(() => Int, { nullable: true })
  version_code?: number;
}
