import {
  IsStringLanguageInput,
  StringLanguageInput,
  TransformStringLanguageInput,
} from '@/utils';
import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsArray } from 'class-validator';

@ArgsType()
export class CreateAdminTermsSettingsArgs {
  @Field(() => String)
  code: string;

  @IsArray()
  @IsStringLanguageInput()
  @Transform(TransformStringLanguageInput)
  @Field(() => [StringLanguageInput])
  content: StringLanguageInput[];

  @Field(() => String, { nullable: true })
  href?: string;

  @IsArray()
  @IsStringLanguageInput()
  @Transform(TransformStringLanguageInput)
  @Field(() => [StringLanguageInput])
  title: StringLanguageInput[];
}
