import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShowMiddlewareObj } from 'vitnode-shared/middleware/get.middleware.dto';

import { GetMiddlewareService } from './services/get.middleware.service';

@ApiTags('Core')
@Controller('core/middleware')
export class MiddlewareController {
  constructor(private readonly getService: GetMiddlewareService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: ShowMiddlewareObj,
  })
  async get(): Promise<ShowMiddlewareObj> {
    return this.getService.get();
  }
}
