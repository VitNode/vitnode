import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class DeleteCoreAttachmentsArgs {
  @Field(() => Int, { nullable: true })
  id: number | null;

  @Field(() => [Module], { nullable: true })
  module: Module | null;
}

@ObjectType()
class Module {
  @Field(() => String)
  module: string;

  @Field(() => Int)
  id: number;
}
