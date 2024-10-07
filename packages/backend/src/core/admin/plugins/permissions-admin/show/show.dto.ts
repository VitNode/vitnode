import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowAdminPermissionsAdminPlugins {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class ShowAdminPermissionsAdminPluginsObj extends ShowAdminPermissionsAdminPlugins {
  @Field(() => [ShowAdminPermissionsAdminPlugins])
  children: ShowAdminPermissionsAdminPlugins[];
}
