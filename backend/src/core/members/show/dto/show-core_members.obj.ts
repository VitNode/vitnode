import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';

@ObjectType()
export class ShowCoreMembersObj {
  @Field(() => [ShowCoreMembers])
  edges: ShowCoreMembers[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class ShowCoreMembers {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  name_seo: string;

  @Field(() => String)
  email: string;

  @Field(() => Int)
  group_id: number;

  @Field(() => Int)
  joined: number;

  @Field(() => Int)
  birthday: number;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: true })
  image_cover?: string;

  @Field(() => Int)
  posts: number;

  @Field(() => Int)
  followers: number;

  @Field(() => Int)
  reactions: number;

  @Field(() => Boolean)
  newsletter: boolean;

  @Field(() => Boolean)
  hide_real_name: boolean;

  @Field(() => String)
  avatar_color: string;

  @Field(() => Int)
  unread_notifications: number;
}
