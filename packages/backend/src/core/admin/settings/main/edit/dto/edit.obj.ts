import { ObjectType, PickType } from '@nestjs/graphql';

import { ShowSettingsObj } from '../../../../../settings/show/dto/show.obj';

@ObjectType()
export class EditAdminSettingsObj extends PickType(ShowSettingsObj, [
  'site_copyright',
  'site_description',
  'site_name',
] as const) {}
