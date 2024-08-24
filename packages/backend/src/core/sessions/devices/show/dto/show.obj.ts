import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowCoreSessionDevicesObj {
  @Field(() => Date)
  created: Date;

  @Field(() => Date)
  expires: Date;

  @Field(() => Int)
  id: number;

  @Field(() => String)
  ip_address: string;

  @Field(() => Date)
  last_seen: Date;

  @Field(() => String)
  login_token: string;

  @Field(() => String)
  uagent_browser: string;

  @Field(() => String)
  uagent_os: string;

  @Field(() => String)
  uagent_version: string;
}
