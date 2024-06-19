import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { ArrayMinSize, ValidateNested, IsArray } from "class-validator";
import {
  IsTextLanguageInput,
  TextLanguageInput,
  TransformTextLanguageInput
} from "vitnode-backend";

@InputType()
class GroupsPermissionsCreatePluginCategories {
  @Field(() => Int)
  group_id: number;

  @Field(() => Boolean)
  can_read: boolean;

  @Field(() => Boolean)
  can_create: boolean;

  @Field(() => Boolean)
  can_reply: boolean;

  @Field(() => Boolean)
  can_download_files: boolean;
}

@InputType()
export class PermissionsCreatePluginCategories {
  @Field(() => Boolean)
  can_all_read: boolean;

  @Field(() => Boolean)
  can_all_create: boolean;

  @Field(() => Boolean)
  can_all_reply: boolean;

  @Field(() => Boolean)
  can_all_download_files: boolean;

  @Field(() => [GroupsPermissionsCreatePluginCategories])
  groups: GroupsPermissionsCreatePluginCategories[];
}

@ArgsType()
export class CreatePluginCategoriesArgs {
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

  @Field(() => String)
  color: string;

  @Field(() => PermissionsCreatePluginCategories)
  permissions: PermissionsCreatePluginCategories;
}
