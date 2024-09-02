import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DeleteAdminPluginsArgs {
  @Field(() => String)
  code: string;
}
