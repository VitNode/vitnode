import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class DownloadAdminThemesArgs {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  version: string | null;

  @Field(() => Int, { nullable: true })
  version_code: number | null;
}
