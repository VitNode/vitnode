import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteAdminNavArgs {
  external: boolean;

  @Field(() => Int)
  id: number;
}
