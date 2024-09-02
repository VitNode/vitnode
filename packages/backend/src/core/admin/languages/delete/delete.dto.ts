import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DeleteCoreAdminLanguagesArgs {
  @Field(() => String)
  code: string;
}
