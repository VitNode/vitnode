import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

import { TransformString } from '@/utils';

@ArgsType()
export class TestAdminEmailSettingsServiceArgs {
  @Field(() => String)
  @Transform(TransformString)
  message: string;

  @IsEmail()
  @Field(() => String)
  @Transform(TransformString)
  to: string;

  @IsEmail()
  @Field(() => String)
  @Transform(TransformString)
  from: string;

  @Field(() => String)
  @Transform(TransformString)
  subject: string;

  @Field(() => String, { nullable: true })
  @Transform(TransformString)
  preview_text?: string;
}
