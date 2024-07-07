import { CaptchaSecurityCoreMiddleware } from '@/core/middleware/show/dto/show.obj';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowAdminCaptchaSecurityObj extends CaptchaSecurityCoreMiddleware {
  @Field(() => String)
  secret_key: string;
}
