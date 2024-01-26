import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShowAdminThemesService {
  constructor(private databaseService: DatabaseService) {}

  async show(): Promise<string> {
    return 'Hello World!';
  }
}
