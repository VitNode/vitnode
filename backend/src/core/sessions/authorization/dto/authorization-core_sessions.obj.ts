import { Field, ObjectType } from '@nestjs/graphql';

import { UploadCoreAttachmentsObj } from '../../../attachments/upload/dto/upload-core_attachments.obj';
import { User } from '@/utils/decorators/user.decorator';

@ObjectType()
export class AuthorizationCurrentUserObj extends User {
  @Field(() => Boolean)
  is_admin: boolean;

  @Field(() => UploadCoreAttachmentsObj, { nullable: true })
  avatar: UploadCoreAttachmentsObj | null;
}
@ObjectType()
export class AuthorizationCoreSessionsObj {
  @Field(() => AuthorizationCurrentUserObj, { nullable: true })
  user: AuthorizationCurrentUserObj | null;
}
