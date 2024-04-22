import { Injectable } from "@nestjs/common";

import { DatabaseService } from "@/plugins/database/database.service";

@Injectable()
export class ShowCoreFilesService {
  constructor(private databaseService: DatabaseService) {}

  async show() {}
}
