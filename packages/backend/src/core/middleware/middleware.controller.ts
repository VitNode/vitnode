import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ShowCoreMiddlewareObj } from './show/show.rest.dto';
import { ShowCoreMiddlewareService } from './show/show.service';

@ApiTags('Middleware')
@Controller('middleware')
export class MiddlewareController {
  constructor(private readonly showService: ShowCoreMiddlewareService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: ShowCoreMiddlewareObj,
  })
  async show(): Promise<ShowCoreMiddlewareObj> {
    return await this.showService.show();
  }
}
