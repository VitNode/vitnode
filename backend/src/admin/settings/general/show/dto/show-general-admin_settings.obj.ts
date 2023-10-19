import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowGeneralAdminSettingsObj {
  @Field(() => String)
  site_name: string;
}
