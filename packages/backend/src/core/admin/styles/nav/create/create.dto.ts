import {
  IsStringLanguageInput,
  StringLanguageInput,
  TransformString,
  TransformStringLanguageInput,
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
  @IsStringLanguageInput()
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

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsStringLanguageInput()
  @Transform(TransformStringLanguageInput)
  @Field(() => [StringLanguageInput])
  name: StringLanguageInput[];
}
