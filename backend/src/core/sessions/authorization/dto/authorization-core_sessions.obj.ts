import { Field, Int, ObjectType } from '@nestjs/graphql';

import { UploadCoreAttachmentsObj } from '../../../attachments/upload/dto/upload-core_attachments.obj';

@ObjectType()
class AvatarObj {
  @Field(() => String)
  color: string;

  @Field(() => UploadCoreAttachmentsObj, { nullable: true })
  img?: UploadCoreAttachmentsObj;
}

@ObjectType()
export class AuthorizationCurrentUserObj {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  name_seo: string;

  @Field(() => Int)
  birthday: number;

  @Field(() => Boolean, { nullable: true })
  newsletter?: boolean;

  @Field(() => Int)
  group_id: number;

  @Field(() => Boolean)
  is_admin: boolean;

  @Field(() => AvatarObj)
  avatar: AvatarObj;
}
@ObjectType()
export class AuthorizationCoreSessionsObj {
  @Field(() => AuthorizationCurrentUserObj, { nullable: true })
  user?: AuthorizationCurrentUserObj;

  @Field(() => String)
  side_name: string;
}
