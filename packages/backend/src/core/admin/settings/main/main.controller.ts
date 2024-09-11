import { Controller, Put } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Core - Settings')
@Controller('admin/core/settings')
@ApiCookieAuth()
export class AdminMainSettingsController {
  @Put()
  edit(): string {
    return 'Edit Admin Main Settings';
  }
}
