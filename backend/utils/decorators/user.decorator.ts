import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Field, GqlExecutionContext, ObjectType } from '@nestjs/graphql';

import { UploadCoreAttachmentsObj } from '@/src/core/attachments/upload/dto/upload.obj';
import { TextLanguage } from '@/types/database/text-language.type';

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const dataFromContext = ctx.getContext().req.user;

  return dataFromContext;
});

@ObjectType()
export class GroupUser {
  @Field(() => String)
  id: string;

  @Field(() => [TextLanguage])
  name: TextLanguage[];
}

@ObjectType()
export class AvatarUser {
  @Field(() => String, { nullable: true })
  url: string | null;
}

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  avatar_color: string;

  @Field(() => AvatarUser, { nullable: true })
  avatar: AvatarUser | null;

  @Field(() => GroupUser)
  group: GroupUser;
}
