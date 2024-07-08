import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteAdminNavStylesArgs {
  @Field(() => Int)
  id: number;
}
