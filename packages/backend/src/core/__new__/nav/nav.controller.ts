import { Body, Controller, Get } from '@nestjs/common';

import { ShowCoreNavService } from './show/show.service';
import { ShowCoreNavObj } from './show/dto/show.obj';
import { ShowCoreNavBody } from './show/dto/show.args';

@Controller('core/nav')
export class NavController {
  constructor(private readonly showService: ShowCoreNavService) {}

  @Get()
  async findAll(@Body() args: ShowCoreNavBody): Promise<ShowCoreNavObj> {
    return this.showService.show(args);
  }
}
