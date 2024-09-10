import { TransformString } from '@/utils';
import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { MaxLength, MinLength } from 'class-validator';

@ArgsType()
export class CreateAdminNavPluginsArgs {
  @Field(() => String)
  @MinLength(3)
  @MaxLength(100)
  @Transform(TransformString)
  code: string;

  @Field(() => String, { nullable: true })
  icon: null | string;

  @Field(() => [String])
  keywords: string[];

  @Field(() => String, { nullable: true })
  parent_code?: string;

  @Field(() => String)
  plugin_code: string;
}
