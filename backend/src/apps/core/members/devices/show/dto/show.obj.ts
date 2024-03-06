import { Field, ObjectType } from "@nestjs/graphql";
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
  @Field(() => String)
  login_token: string;

  @Field(() => Number)
  user_id: number;

  @Field(() => Number)
  last_seen: number;

  @Field(() => Number)
  expires: number;

  @Field(() => Number)
  device_id: number;
}