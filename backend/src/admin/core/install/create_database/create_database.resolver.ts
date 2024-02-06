import { Mutation, Resolver } from "@nestjs/graphql";

import { CreateDatabaseAdminInstallService } from "./create_database.service";

@Resolver()
export class CreateDatabaseAdminInstallResolver {
  constructor(private readonly service: CreateDatabaseAdminInstallService) {}

  @Mutation(() => String)
  async admin_install__create_database(): Promise<string> {
    return await this.service.create();
  }
}
