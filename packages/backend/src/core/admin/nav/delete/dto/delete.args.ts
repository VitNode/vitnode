import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteAdminNavArgs {
  @Field(() => Int)
  id: number;
}
