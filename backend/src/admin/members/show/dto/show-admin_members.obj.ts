import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';
import { UploadCoreAttachmentsObj } from '@/src/core/attachments/upload/dto/upload-core_attachments.obj';

@ObjectType()
export class ShowAdminMembersObj {
  @Field(() => [ShowAdminMembers])
  edges: ShowAdminMembers[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class ShowAdminMembers {
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

  @Field(() => UploadCoreAttachmentsObj, { nullable: true })
  avatar?: UploadCoreAttachmentsObj;

  @Field(() => UploadCoreAttachmentsObj, { nullable: true })
  image_cover?: UploadCoreAttachmentsObj;

  @Field(() => Int)
  posts: number;

  @Field(() => Int)
  followers: number;

  @Field(() => Int)
  reactions: number;

  @Field(() => Boolean)
  newsletter: boolean;

  @Field(() => String)
  avatar_color: string;

  @Field(() => Int)
  unread_notifications: number;
}
