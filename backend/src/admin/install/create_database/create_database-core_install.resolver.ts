import { Mutation, Resolver } from '@nestjs/graphql';

import { CreateDatabaseAdminInstallService } from './create_database-core_install.service';

@Resolver()
export class CreateDatabaseAdminInstallResolver {
  constructor(private readonly service: CreateDatabaseAdminInstallService) {}

  @Mutation(() => String)
  async create_database_admin_install(): Promise<string> {
    return await this.service.create();
  }
}
