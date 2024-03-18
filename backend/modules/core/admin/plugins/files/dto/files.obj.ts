import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FilesAdminPluginsObj {
  @Field(() => Int)
  databases: number;

  @Field(() => Int)
  admin_pages: number;

  @Field(() => Int)
  admin_templates: number;

  @Field(() => Int)
  pages_container: number;

  @Field(() => Int)
  pages: number;

  @Field(() => Boolean)
  default_page: boolean;

  @Field(() => Int)
  hooks: number;

  @Field(() => Int)
  templates: number;

  @Field(() => Int)
  graphql_queries: number;

  @Field(() => Int)
  graphql_mutations: number;

  @Field(() => Boolean)
  language: boolean;
}
