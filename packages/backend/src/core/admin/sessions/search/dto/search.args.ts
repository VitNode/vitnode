import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SearchAdminSessionsArgs {
  @Field(() => String)
  search: string;
}
