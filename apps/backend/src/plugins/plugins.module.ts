// ! DO NOT REMOVE OR MODIFY THIS FILE!!!

import { Module } from "@nestjs/common";

import { BlogModule } from "./blog/blog.module";
// ! === IMPORT ===

@Module({
  imports: [
    BlogModule
    // ! === MODULE ===
  ]
})
export class PluginsModule {}
