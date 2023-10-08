import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class DeleteCoreAttachmentsArgs {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => [Module], { nullable: true })
  module?: Module;
}

@ObjectType()
class Module {
  @Field(() => String)
  module: string;

  @Field(() => String)
  id: string;
}
