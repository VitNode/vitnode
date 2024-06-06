import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ShowAdminEmailSettingsServiceObj {
  @Field(() => String)
  host: string;

  @Field(() => String)
  user: string;

  @Field(() => Int)
  port: number;

  @Field(() => Boolean)
  secure: boolean;
}
