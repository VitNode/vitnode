import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ShowGeneralAdminSettingsObj {
  @Field(() => String)
  side_name: string;
}
