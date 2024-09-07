import {
  StringLanguageInput,
  TransformString,
  TransformStringLanguageInput,
} from '@/utils';
import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { ArrayMinSize, IsNotEmpty, MaxLength } from 'class-validator';

@ArgsType()
export class CreateAdminNavStylesArgs {
  @Transform(TransformStringLanguageInput)
  @Field(() => [StringLanguageInput])
  description: StringLanguageInput[];

  @Field(() => Boolean)
  external: boolean;

  @Transform(TransformString)
  @IsNotEmpty()
  @Field(() => String)
  @MaxLength(255)
  href: string;

  @Field(() => String, { nullable: true })
  icon: null | string;

  @ArrayMinSize(1)
  @Transform(TransformStringLanguageInput)
  @Field(() => [StringLanguageInput])
  name: StringLanguageInput[];
}
