import { CaptchaSecurityCoreMiddleware } from '@/core/middleware/show/show.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowAdminCaptchaSecurityObj extends CaptchaSecurityCoreMiddleware {
  @Field(() => String)
  secret_key: string;
}
