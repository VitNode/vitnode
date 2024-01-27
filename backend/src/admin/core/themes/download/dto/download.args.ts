import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class DownloadAdminThemesArgs {
  @Field(() => Int)
  id: number;
}
