import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DownloadCoreAdminLanguagesArgs {
  @Field(() => String)
  code: string;

  @Field(() => [String])
  plugins: string[];
}
