import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DeleteAdminGroupsArgs {
  @Field(() => String)
  id: string;
}
