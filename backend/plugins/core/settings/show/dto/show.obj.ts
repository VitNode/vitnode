import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ShowSettingsObj {
  @Field(() => String)
  site_name: string;
}
