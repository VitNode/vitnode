import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShowMiddlewareObj } from 'vitnode-shared/middleware.dto';

import { ShowMiddlewareService } from './services/show.middleware.service';

@ApiTags('Core')
@Controller('core/middleware')
export class MiddlewareController {
  constructor(private readonly showService: ShowMiddlewareService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: ShowMiddlewareObj,
  })
  async show(): Promise<ShowMiddlewareObj> {
    return this.showService.show();
  }
}
