import { Body, Controller, Post } from '@nestjs/common';

import { SignInSessionsCoreBody } from './sign_in/dto/sign_in.args';
import { SignInSessionsCoreService } from './sign_in/sign_in.service';

@Controller('core/sessions')
export class SessionsCoreController {
  constructor(private readonly signInService: SignInSessionsCoreService) {}

  @Post('sign_in')
  async signIn(@Body() args: SignInSessionsCoreBody): Promise<string> {
    return this.signInService.signIn(args);
  }
}
