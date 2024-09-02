import { ShowSettingsObj } from '@/core/settings/show/dto/show.obj';
import { TextLanguageInput } from '@/utils';
import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';

@ArgsType()
export class EditAdminMainSettingsArgs {
  @Field(() => [TextLanguageInput])
  site_copyright: TextLanguageInput[];

  @Field(() => [TextLanguageInput])
  site_description: TextLanguageInput[];

  @Field(() => String)
  site_name: string;

  @Field(() => String)
  site_short_name: string;
}

@ObjectType()
export class EditAdminSettingsObj extends PickType(ShowSettingsObj, [
  'site_copyright',
  'site_description',
  'site_name',
] as const) {}
