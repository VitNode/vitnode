import { ShowSettingsObj } from '@/core/settings/show/show.dto';
import { StringLanguageInput } from '@/utils';
import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';

@ArgsType()
export class EditAdminMainSettingsArgs {
  @Field(() => [StringLanguageInput])
  site_copyright: StringLanguageInput[];

  @Field(() => [StringLanguageInput])
  site_description: StringLanguageInput[];

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
