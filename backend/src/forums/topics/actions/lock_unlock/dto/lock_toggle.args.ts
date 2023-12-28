import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LockToggleForumTopicsArgs {
  @Field(() => String)
  id: string;
}
