import { Injectable } from "@nestjs/common";

import { CreateCoreAdminLanguagesArgs } from "./dto/edit.args";

import { DatabaseService } from "@/database/database.service";
import { ShowCoreLanguages } from "@/src/core/languages/show/dto/show.obj";

@Injectable()
export class CreateAdminCoreLanguageService {
  constructor(private databaseService: DatabaseService) {}

  async create({
    code,
    name,
    timezone
  }: CreateCoreAdminLanguagesArgs): Promise<ShowCoreLanguages> {
    return {
      id: 1,
      name: "test",
      code: "test",
      timezone: "test",
      default: true,
      protected: true,
      enabled: true
    };
  }
}
