import { Field, ObjectType } from '@nestjs/graphql';

import { CaptchaSecurityCoreMiddleware } from '@/core/middleware/show/dto/show.obj';

@ObjectType()
export class ShowAdminCaptchaSecurityObj extends CaptchaSecurityCoreMiddleware {
  @Field(() => String)
  secret_key: string;
}
