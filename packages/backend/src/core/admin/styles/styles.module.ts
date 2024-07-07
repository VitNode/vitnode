import { Module } from '@nestjs/common';
import { AdminNavStylesModule } from './nav/nav.module';

@Module({
  imports: [AdminNavStylesModule],
})
export class AdminStylesModule {}
