import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";

import { TextLanguageInput } from "@/types/database/text-language.type";

@InputType()
class GroupsPermissionsCreateForumForums {
  @Field(() => Int)
  id: number;

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

  @Field(() => Int, { nullable: true })
  parent_id: number | null;

  @Field(() => PermissionsCreateForumForums)
  permissions: PermissionsCreateForumForums;
}
