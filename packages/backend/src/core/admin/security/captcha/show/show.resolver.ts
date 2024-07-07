import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowAdminCaptchaSecurityService } from './show.service';
import { ShowAdminCaptchaSecurityObj } from './dto/show.obj';

import { AdminAuthGuards } from '../../../../../utils/guards/admin-auth.guard';

@Resolver()
export class ShowAdminCaptchaSecurityResolver {
  constructor(private readonly service: ShowAdminCaptchaSecurityService) {}

  @Query(() => ShowAdminCaptchaSecurityObj)
  @UseGuards(AdminAuthGuards)
  admin__core_security__captcha__show(): ShowAdminCaptchaSecurityObj {
    return this.service.show();
  }
}
