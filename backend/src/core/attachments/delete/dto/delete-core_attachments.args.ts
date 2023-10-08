import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DeleteCoreAttachmentsArgs {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  module?: string;

  @Field(() => String, { nullable: true })
  module_id?: string;
}
