import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class DeleteCoreAttachmentsArgs {
  @Field(() => String, { nullable: true })
  id: string | null;

  @Field(() => [Module], { nullable: true })
  module: Module | null;
}

@ObjectType()
class Module {
  @Field(() => String)
  module: string;

  @Field(() => String)
  id: string;
}
