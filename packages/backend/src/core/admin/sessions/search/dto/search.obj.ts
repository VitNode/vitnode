import { Field, ObjectType } from '@nestjs/graphql';

import { ShowAdminNavPlugins } from '@/core/admin/plugins/nav/show/dto/show.obj';

@ObjectType()
export class NavSearchAdminSessions extends ShowAdminNavPlugins {
  @Field(() => String)
  code_plugin: string;
}

@ObjectType()
export class SearchAdminSessionsObj {
  @Field(() => [NavSearchAdminSessions])
  nav: NavSearchAdminSessions[];
}
