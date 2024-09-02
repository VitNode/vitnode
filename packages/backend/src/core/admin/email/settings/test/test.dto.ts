import { TransformString } from '@/utils';
import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

@ArgsType()
export class TestAdminEmailSettingsServiceArgs {
  @IsEmail()
  @Field(() => String)
  @Transform(TransformString)
  from: string;

  @Field(() => String)
  @Transform(TransformString)
  message: string;

  @Field(() => String, { nullable: true })
  @Transform(TransformString)
  preview_text?: string;

  @Field(() => String)
  @Transform(TransformString)
  subject: string;

  @IsEmail()
  @Field(() => String)
  @Transform(TransformString)
  to: string;
}
