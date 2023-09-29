import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateCoreGroupsArgs {
  @Field(() => String)
  name: string;
}
