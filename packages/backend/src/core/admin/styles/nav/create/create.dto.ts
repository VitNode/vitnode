import {
  IsTextLanguageInput,
  TextLanguageInput,
  TransformString,
  TransformTextLanguageInput,
} from '@/utils';
import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  MaxLength,
  ValidateNested,
} from 'class-validator';

@ArgsType()
export class CreateAdminNavStylesArgs {
  @IsArray()
  @ValidateNested({ each: true })
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  description: TextLanguageInput[];

  @Field(() => Boolean)
  external: boolean;

  @Transform(TransformString)
  @IsNotEmpty()
  @Field(() => String)
  @MaxLength(255)
  href: string;

  @Field(() => String, { nullable: true })
  icon: null | string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  name: TextLanguageInput[];
}
