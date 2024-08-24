import { AdminAuthGuards } from '@/utils/guards/admin-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { ShowAdminCaptchaSecurityObj } from './dto/show.obj';
import { ShowAdminCaptchaSecurityService } from './show.service';

@Resolver()
export class ShowAdminCaptchaSecurityResolver {
  constructor(private readonly service: ShowAdminCaptchaSecurityService) {}

  @Query(() => ShowAdminCaptchaSecurityObj)
  @UseGuards(AdminAuthGuards)
  admin__core_security__captcha__show(): ShowAdminCaptchaSecurityObj {
    return this.service.show();
  }
}
