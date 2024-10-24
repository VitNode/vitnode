import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShowAuthObj } from 'vitnode-shared/auth.dto';

import { ShowAuthService } from './services/show.service';

@ApiTags('Core')
@Controller('core/auth')
export class AuthController {
  constructor(private readonly showService: ShowAuthService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: ShowAuthObj,
  })
  async show(): Promise<ShowAuthObj> {
    return await this.showService.show();
  }
}
