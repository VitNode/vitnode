import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FilesAdminPluginsObj {
  @Field(() => Int)
  admin_pages: number;

  @Field(() => Int)
  admin_templates: number;

  @Field(() => Int)
  databases: number;

  @Field(() => Boolean)
  default_page: boolean;

  @Field(() => Int)
  pages: number;

  @Field(() => Int)
  templates: number;
}
