import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class DeleteCoreEditorArgs {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  security_key?: string;
}
