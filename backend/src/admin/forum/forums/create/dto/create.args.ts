import { ArgsType, Field, InputType } from '@nestjs/graphql';

import { TextLanguageInput } from '@/types/database/text-language.type';

@InputType()
class GroupsPermissionsCreateForumForums {
  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  view: boolean;

  @Field(() => Boolean)
  read: boolean;

  @Field(() => Boolean)
  create: boolean;

  @Field(() => Boolean)
  reply: boolean;
}

@InputType()
class PermissionsCreateForumForums {
  @Field(() => Boolean)
  can_all_view: boolean;

  @Field(() => Boolean)
  can_all_read: boolean;

  @Field(() => Boolean)
  can_all_create: boolean;

  @Field(() => Boolean)
  can_all_reply: boolean;

  @Field(() => [GroupsPermissionsCreateForumForums])
  groups: GroupsPermissionsCreateForumForums[];
}

@ArgsType()
export class CreateForumForumsArgs {
  @Field(() => [TextLanguageInput])
  name: TextLanguageInput[];

  @Field(() => [TextLanguageInput])
  description: TextLanguageInput[];

  @Field(() => String, { nullable: true })
  parent_id: string | null;

  @Field(() => Boolean, { nullable: true })
  is_category: boolean | null;

  @Field(() => PermissionsCreateForumForums)
  permissions: PermissionsCreateForumForums;
}
