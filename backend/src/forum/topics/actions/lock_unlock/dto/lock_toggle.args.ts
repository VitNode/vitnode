import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class LockToggleForumTopicsArgs {
  @Field(() => Int)
  id: number;
}
