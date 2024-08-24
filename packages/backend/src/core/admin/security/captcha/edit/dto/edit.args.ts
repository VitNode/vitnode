import { CaptchaTypeEnum } from '@/providers';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class EditAdminCaptchaSecurityArgs {
  @Field(() => String)
  secret_key: string;

  @Field(() => String)
  site_key: string;

  @Field(() => CaptchaTypeEnum)
  type: CaptchaTypeEnum;
}
