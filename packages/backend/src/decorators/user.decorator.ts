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
  @Field(() => Int)
  id: number;

  @Field(() => [TextLanguage])
  name: TextLanguage[];

  @Field(() => String, { nullable: true })
  color: string | null;
}

@ObjectType()
export class AvatarUser {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  dir_folder: string;

  @Field(() => String)
  file_name: string;
}

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name_seo: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  avatar_color: string;

  @Field(() => String)
  language: string;

  @Field(() => AvatarUser, { nullable: true })
  avatar: AvatarUser | null;

  @Field(() => GroupUser)
  group: GroupUser;
}
