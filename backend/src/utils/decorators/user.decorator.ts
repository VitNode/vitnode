import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Field, GqlExecutionContext, Int, ObjectType } from "@nestjs/graphql";

import { TextLanguage } from "@/types/database/text-language.type";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const dataFromContext = ctx.getContext().req.user;

    return dataFromContext;
  }
);

@ObjectType()
export class GroupUser {
  @Field(() => Int)
  id: number;

  @Field(() => [TextLanguage])
  name: TextLanguage[];
}

@ObjectType()
export class AvatarUser {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  dir_folder: string;

  @Field(() => String)
  name: string;
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

  @Field(() => AvatarUser, { nullable: true })
  avatar: AvatarUser | null;

  @Field(() => GroupUser)
  group: GroupUser;
}
