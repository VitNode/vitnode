import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ShowAdminNavPluginsObj {
  @Field(() => String)
  code: string;

  @Field(() => String, { nullable: true })
  icon: string | null;

  @Field(() => String)
  href: string;
}
