import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ShowAdminNavPluginsObj {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  code: string;

  @Field(() => String, { nullable: true })
  icon: string | null;

  @Field(() => Int)
  position: number;

  @Field(() => String)
  href: string;
}
