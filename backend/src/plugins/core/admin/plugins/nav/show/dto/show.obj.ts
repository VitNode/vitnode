import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ShowAdminNavPlugins {
  @Field(() => String)
  code: string;

  @Field(() => String, { nullable: true })
  icon: string | null;

  @Field(() => String)
  href: string;
}

@ObjectType()
export class ShowAdminNavPluginsObj extends ShowAdminNavPlugins {
  @Field(() => [ShowAdminNavPlugins])
  children: ShowAdminNavPlugins[];
}
