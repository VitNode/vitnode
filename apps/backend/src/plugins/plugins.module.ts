// ! DO NOT REMOVE, MODIFY OR MOVE THIS FILE!!!

import { Module } from '@nestjs/common';

import { BlogModule } from './blog/blog.module';
import { WelcomeModule } from './welcome/welcome.module';
// ! === IMPORT ===

@Module({
  imports: [
    BlogModule,
    WelcomeModule,
    // ! === MODULE ===
  ],
})
export class PluginsModule {}
