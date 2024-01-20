import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@/database/database.service';

@Injectable()
export class ShowAdminPluginsService {
  constructor(private databaseService: DatabaseService) {}
}
