import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ShowCorePluginsObj {
  @Field(() => String)
  code: string;
}
