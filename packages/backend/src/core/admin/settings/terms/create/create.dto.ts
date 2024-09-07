import { StringLanguageInput, TransformStringLanguageInput } from '@/utils';
import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { ArrayMinSize } from 'class-validator';

@ArgsType()
export class CreateAdminTermsSettingsArgs {
  @Field(() => String)
  code: string;

  @ArrayMinSize(1)
  @Transform(TransformStringLanguageInput)
  @Field(() => [StringLanguageInput])
  content: StringLanguageInput[];

  @Field(() => String, { nullable: true })
  href?: string;

  @ArrayMinSize(1)
  @Transform(TransformStringLanguageInput)
  @Field(() => [StringLanguageInput])
  title: StringLanguageInput[];
}
