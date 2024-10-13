import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowAdminPermissionsAdminPluginsObj {
  @Field(() => [String])
  children: string[];

  @Field(() => String)
  id: string;
}
