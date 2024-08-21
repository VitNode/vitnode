import { Body, Controller, Get } from '@nestjs/common';

import { ShowNavCoreService } from './show/show.service';
import { ShowNavCoreObj } from './show/dto/show.obj';
import { ShowNavCoreBody } from './show/dto/show.args';

@Controller('core/nav')
export class NavCoreController {
  constructor(private readonly showService: ShowNavCoreService) {}

  @Get()
  async findAll(@Body() args: ShowNavCoreBody): Promise<ShowNavCoreObj> {
    return this.showService.show(args);
  }
}
