import { ArgsType, Field } from '@nestjs/graphql';

import { CaptchaTypeEnum } from '@/providers';

@ArgsType()
export class EditAdminCaptchaSecurityArgs {
  @Field(() => String)
  secret_key: string;

  @Field(() => CaptchaTypeEnum)
  type: CaptchaTypeEnum;

  @Field(() => String)
  site_key: string;
}
