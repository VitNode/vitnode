// ! DO NOT REMOVE, MODIFY OR MOVE THIS FILE!!!

import { Module } from '@nestjs/common';

import { WelcomeModule } from './welcome/welcome.module';
// ! === IMPORT ===

@Module({
  imports: [
    WelcomeModule,
    // ! === MODULE ===
  ],
})
export class PluginsModule {}
