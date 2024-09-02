import { SignUpCoreSessionsObj } from '@/core/sessions/sign_up/dto/sign_up.obj';
import { SignUpHelperService } from '@/core/sessions/sign_up/helpers/sign-up-helper.service';
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
