import { InternalDatabaseService } from '@/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAdminTermsSettingsService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async create(): Promise<void> {}
}
