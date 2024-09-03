import {
  IsTextLanguageInput,
  TextLanguageInput,
  TransformTextLanguageInput,
} from '@/utils';
import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsArray } from 'class-validator';

@ArgsType()
export class CreateAdminTermsSettingsArgs {
  @IsArray()
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  content: TextLanguageInput[];

  @Field(() => String, { nullable: true })
  href?: string;

  @IsArray()
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  title: TextLanguageInput[];
}
