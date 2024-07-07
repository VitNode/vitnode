import { ShowSettingsObj } from '@/core/settings/show/dto/show.obj';
import { ObjectType, PickType } from '@nestjs/graphql';

@ObjectType()
export class EditAdminSettingsObj extends PickType(ShowSettingsObj, [
  'site_copyright',
  'site_description',
  'site_name',
] as const) {}
