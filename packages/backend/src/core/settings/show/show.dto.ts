import { StringLanguage } from '@/utils';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class ShowSettingsResponse {
  @ApiProperty()
  site_name: string;

  @ApiProperty()
  site_short_name: string;
}

@ObjectType()
export class ShowSettingsObj {
  @Field(() => [StringLanguage])
  site_copyright: StringLanguage[];

  @Field(() => [StringLanguage])
  site_description: StringLanguage[];

  @Field(() => String)
  site_name: string;

  @Field(() => String)
  site_short_name: string;
}
