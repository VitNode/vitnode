import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ShowCoreSessionDevicesObj {
  @Field(() => Date)
  last_seen: Date;

  @Field(() => Date)
  expires: Date;

  @Field(() => Int)
  id: number;

  @Field(() => String)
  uagent_browser: string;

  @Field(() => String)
  uagent_version: string;

  @Field(() => String)
  uagent_os: string;

  @Field(() => String)
  login_token: string;

  @Field(() => String)
  ip_address: string;
}
