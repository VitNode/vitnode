import { Field, ObjectType } from '@nestjs/graphql';

import { UploadCoreAttachmentsObj } from '../../../attachments/upload/dto/upload-core_attachments.obj';
import { User } from '@/utils/decorators/user.decorator';

@ObjectType()
class AvatarObj {
  @Field(() => String)
  color: string;

  @Field(() => UploadCoreAttachmentsObj, { nullable: true })
  img?: UploadCoreAttachmentsObj;
}

@ObjectType()
export class AuthorizationCurrentUserObj extends User {
  @Field(() => Boolean)
  is_admin: boolean;

  @Field(() => AvatarObj)
  avatar: AvatarObj;
}
@ObjectType()
export class AuthorizationCoreSessionsObj {
  @Field(() => AuthorizationCurrentUserObj, { nullable: true })
  user?: AuthorizationCurrentUserObj;
}
