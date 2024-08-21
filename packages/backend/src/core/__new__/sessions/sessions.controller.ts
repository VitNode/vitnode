import { Controller, Post } from '@nestjs/common';

@Controller('core/sessions')
export class SessionsCoreController {
  @Post('sign_in')
  async findAll(): Promise<string> {
    return 'Test';
  }
}
