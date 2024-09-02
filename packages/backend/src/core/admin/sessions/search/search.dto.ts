import { ShowAdminNavPlugins } from '@/core/admin/plugins/nav/show/show.dto';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class SearchAdminSessionsArgs {
  @Field(() => String)
  search: string;
}

@ObjectType()
export class NavSearchAdminSessions extends ShowAdminNavPlugins {
  @Field(() => String)
  code_plugin: string;

  @Field(() => String, { nullable: true })
  parent_nav_code?: string;
}

@ObjectType()
export class SearchAdminSessionsObj {
  @Field(() => [NavSearchAdminSessions])
  nav: NavSearchAdminSessions[];
}
