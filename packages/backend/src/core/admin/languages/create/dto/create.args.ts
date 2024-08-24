import { TransformString } from '@/utils';
import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class CreateCoreAdminLanguagesArgs {
  @Field(() => Boolean)
  allow_in_input: boolean;

  @Transform(TransformString)
  @Field(() => String)
  code: string;

  @Field(() => String)
  @IsNotEmpty()
  locale: string;

  @Transform(TransformString)
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  time_24: boolean;

  @Transform(TransformString)
  @IsNotEmpty()
  @Field(() => String)
  timezone: string;
}
