import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateAdminGroupsArgs {
  @Field(() => String)
  name: string;
}
