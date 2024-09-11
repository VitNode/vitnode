import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ShowSettingsResponse } from './show/show.dto';
import { ShowSettingsService } from './show/show.service';

@ApiTags('Core - Settings')
@Controller('core/settings')
export class CoreSettingsController {
  constructor(private readonly showService: ShowSettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Show basic settings from config.json' })
  @ApiResponse({
    status: 200,
    type: ShowSettingsResponse,
  })
  async show(): Promise<ShowSettingsResponse> {
    return await this.showService.show();
  }
}
