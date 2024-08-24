import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Field, GqlExecutionContext, Int, ObjectType } from '@nestjs/graphql';

import { GqlContext, TextLanguage } from '../utils';

export const CurrentUser = createParamDecorator(
  (_data: unknown, payloadContext: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(payloadContext);
    const context: GqlContext = ctx.getContext();

    return context.req.user;
  },
);

@ObjectType()
export class GroupUser {
  @Field(() => String, { nullable: true })
  color: null | string;

  @Field(() => Int)
  id: number;

  @Field(() => [TextLanguage])
  name: TextLanguage[];
}

@ObjectType()
export class AvatarUser {
  @Field(() => String)
  dir_folder: string;

  @Field(() => String)
  file_name: string;

  @Field(() => Int)
  id: number;
}

@ObjectType()
export class User {
  @Field(() => AvatarUser, { nullable: true })
  avatar: AvatarUser | null;

  @Field(() => String)
  avatar_color: string;

  @Field(() => GroupUser)
  group: GroupUser;

  @Field(() => Int)
  id: number;

  @Field(() => String)
  language: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  name_seo: string;
}
