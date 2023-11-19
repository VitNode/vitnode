import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';
import { UploadCoreAttachmentsObj } from '../../../attachments/upload/dto/upload-core_attachments.obj';
import { TextLanguage } from '../../../../../types/database/text-language.type';

@ObjectType()
export class ShowCoreMembersObj {
  @Field(() => [ShowCoreMembers])
  edges: ShowCoreMembers[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class GroupShowCoreMembers {
  @Field(() => [TextLanguage])
  name: TextLanguage[];
}

@ObjectType()
export class ShowCoreMembers {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  joined: number;

  @Field(() => Int)
  birthday: number;

  @Field(() => UploadCoreAttachmentsObj, { nullable: true })
  avatar?: UploadCoreAttachmentsObj;

  @Field(() => UploadCoreAttachmentsObj, { nullable: true })
  image_cover?: UploadCoreAttachmentsObj;

  @Field(() => GroupShowCoreMembers)
  group: GroupShowCoreMembers;

  @Field(() => Int)
  posts: number;

  @Field(() => Int)
  followers: number;

  @Field(() => Int)
  reactions: number;

  @Field(() => String)
  avatar_color: string;
}
