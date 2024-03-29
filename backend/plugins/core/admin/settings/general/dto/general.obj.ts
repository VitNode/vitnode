import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GeneralAdminSettingsObj {
  @Field(() => String)
  side_name: string;
}
