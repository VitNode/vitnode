import { Module } from '@nestjs/common';
import { ShowCoreSessionDevicesResolver } from './show/show.resolver';
import { ShowCoreSessionDevicesService } from './show/show.service';

@Module({
  providers: [ShowCoreSessionDevicesResolver, ShowCoreSessionDevicesService]
})
export class DevicesCoreSession {}
