import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ChangeCoreThemesArgs {
  @Field(() => Int)
  id: number;
}
