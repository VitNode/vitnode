import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PageInfo } from "@/types/database/pagination.type";

@ObjectType()
export class ShowCoreSessionDevicesObj {
  @Field(() => [ShowCoreSessionDevices])
  edges: ShowCoreSessionDevices[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class ShowCoreSessionDevices {
  @Field(() => Int)
  user_id: number;

  @Field(() => String)
  login_token: string;

  @Field(() => Int)
  last_seen: number;

  @Field(() => Int)
  expires: number;

  @Field(() => Int)
  device_id: number;
}
