import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

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
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Field(() => [TextLanguageInput])
  name: TextLanguageInput[];

  @IsArray()
  @Field(() => [TextLanguageInput])
  description: TextLanguageInput[];

  @Field(() => String, { nullable: true })
  parent_id: string | null;

  @Field(() => PermissionsCreateForumForums)
  permissions: PermissionsCreateForumForums;

  @Field(() => String, { nullable: true })
  name_seo: string | null;
}
