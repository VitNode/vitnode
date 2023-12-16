import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Field, GqlExecutionContext, ObjectType } from '@nestjs/graphql';

import { UploadCoreAttachmentsObj } from '../../src/core/attachments/upload/dto/upload.obj';

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const dataFromContext = ctx.getContext().req.user;

  return dataFromContext;
});

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean, { nullable: true })
  newsletter: boolean | null;

  @Field(() => String)
  group_id: string;

  @Field(() => String)
  avatar_color: string;
}

@ObjectType()
export class ShortUser {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => UploadCoreAttachmentsObj, { nullable: true })
  avatar: UploadCoreAttachmentsObj | null;
}
