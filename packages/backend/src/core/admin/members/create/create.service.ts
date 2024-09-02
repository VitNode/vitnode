import { SignUpHelperService } from '@/core/sessions/sign_up/helpers/sign-up-helper.service';
import { SignUpCoreSessionsObj } from '@/core/sessions/sign_up/sign_up.dto';
import { GqlContext } from '@/utils';
import { Injectable } from '@nestjs/common';

import { CreateAdminMembersArgs } from './create.dto';

@Injectable()
export class CreateAdminMembersService {
  constructor(private readonly signUpService: SignUpHelperService) {}

  async create(
    props: CreateAdminMembersArgs,
    context: GqlContext,
  ): Promise<SignUpCoreSessionsObj> {
    return this.signUpService.signUp(props, context);
  }
}
