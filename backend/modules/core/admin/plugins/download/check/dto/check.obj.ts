import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CheckDownloadAdminPluginsObj {
  @Field(() => [String])
  databases: string[];

  @Field(() => [String])
  admin_pages: string[];

  @Field(() => [String])
  pages_container: string[];

  @Field(() => [String])
  pages: string[];

  @Field(() => [String])
  hooks: string[];

  @Field(() => [String])
  templates: string[];
}
