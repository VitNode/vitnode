import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { Transform } from "class-transformer";

import {
  IsTextLanguageInput,
  TextLanguageInput,
  TransformTextLanguageInput
} from "@/src/types/database/text-language.type";

@InputType()
class GroupsPermissionsCreateForumForums {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  can_view: boolean;

  @Field(() => Boolean)
  can_read: boolean;

  @Field(() => Boolean)
  can_create: boolean;

  @Field(() => Boolean)
  can_reply: boolean;
}

@InputType()
export class PermissionsCreateForumForums {
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
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  name: TextLanguageInput[];

  @IsArray()
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  description: TextLanguageInput[];

  @Field(() => Int, { nullable: true })
  parent_id: number | null;

  @Field(() => PermissionsCreateForumForums)
  permissions: PermissionsCreateForumForums;
}
