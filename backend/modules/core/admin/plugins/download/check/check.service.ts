import * as fs from "fs";
import * as fsPromises from "fs/promises";
import { join } from "path";

import { Injectable } from "@nestjs/common";

import { CheckDownloadAdminPluginsArgs } from "./dto/check.args";
import { CheckDownloadAdminPluginsObj } from "./dto/check.obj";

import { DatabaseService } from "@/modules/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";

@Injectable()
export class CheckDownloadAdminPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async check({
    code
  }: CheckDownloadAdminPluginsArgs): Promise<CheckDownloadAdminPluginsObj> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code)
    });

    if (!plugin) {
      throw new NotFoundError("Plugin");
    }

    // Database schema
    const pathDatabaseSchema = join(
      process.cwd(),
      "modules",
      code,
      "admin",
      "database",
      "schema"
    );
    const databaseSchemaFiles = fs.existsSync(pathDatabaseSchema)
      ? (
          await fsPromises.readdir(pathDatabaseSchema, { recursive: true })
        ).filter(file => file.includes(".ts"))
      : [];

    // Frontend - Admin pages
    const pathFrontendAdminPages = join(
      process.cwd(),
      "..",
      "frontend",
      "app",
      "[locale]",
      "(apps)",
      "(admin)",
      "admin",
      "(auth)",
      code
    );
    const frontendAdminPages = fs.existsSync(pathFrontendAdminPages)
      ? (
          await fsPromises.readdir(pathFrontendAdminPages, { recursive: true })
        ).filter(file => file.includes(".tsx") || file.includes(".ts"))
      : [];

    // Frontend - Admin templates
    const pathFrontendAdminTemplates = join(
      process.cwd(),
      "..",
      "frontend",
      "admin",
      code
    );
    const frontendAdminTemplates = fs.existsSync(pathFrontendAdminTemplates)
      ? (
          await fsPromises.readdir(pathFrontendAdminTemplates, {
            recursive: true
          })
        ).filter(file => file.includes(".tsx") || file.includes(".ts"))
      : [];

    // Frontend - Pages Container
    const pathFrontendPagesContainer = join(
      process.cwd(),
      "..",
      "frontend",
      "app",
      "[locale]",
      "(apps)",
      "(main)",
      "(container)",
      code
    );
    const frontendPagesContainer = fs.existsSync(pathFrontendPagesContainer)
      ? (
          await fsPromises.readdir(pathFrontendPagesContainer, {
            recursive: true
          })
        ).filter(file => file.includes(".tsx") || file.includes(".ts"))
      : [];

    // Frontend - Pages
    const pathFrontendPages = join(
      process.cwd(),
      "..",
      "frontend",
      "app",
      "[locale]",
      "(apps)",
      "(main)",
      code
    );
    const frontendPages = fs.existsSync(pathFrontendPages)
      ? (
          await fsPromises.readdir(pathFrontendPages, { recursive: true })
        ).filter(file => file.includes(".tsx") || file.includes(".ts"))
      : [];

    // Frontend - Hooks
    const pathFrontendHooks = join(
      process.cwd(),
      "..",
      "frontend",
      "hooks",
      code
    );
    const frontendHooks = fs.existsSync(pathFrontendHooks)
      ? (
          await fs.promises.readdir(pathFrontendHooks, { recursive: true })
        ).filter(file => file.includes(".tsx") || file.includes(".ts"))
      : [];

    // Frontend - Templates
    const pathFrontendTemplates = join(
      process.cwd(),
      "..",
      "frontend",
      "themes",
      "1",
      code
    );
    const frontendTemplates = fs.existsSync(pathFrontendTemplates)
      ? (
          await fs.promises.readdir(pathFrontendTemplates, { recursive: true })
        ).filter(file => file.includes(".tsx") || file.includes(".ts"))
      : [];

    // Frontend - GraphQL queries
    const pathFrontendGraphQLQueries = join(
      process.cwd(),
      "..",
      "frontend",
      "graphql",
      "queries",
      code
    );
    const frontendGraphQLQueries = fs.existsSync(pathFrontendGraphQLQueries)
      ? (
          await fs.promises.readdir(pathFrontendGraphQLQueries, {
            recursive: true
          })
        ).filter(file => file.includes(".gql"))
      : [];

    // Frontend - GraphQL mutations
    const pathFrontendGraphQLMutations = join(
      process.cwd(),
      "..",
      "frontend",
      "graphql",
      "mutations",
      code
    );
    const frontendGraphQLMutations = fs.existsSync(pathFrontendGraphQLMutations)
      ? (
          await fs.promises.readdir(pathFrontendGraphQLMutations, {
            recursive: true
          })
        ).filter(file => file.includes(".gql"))
      : [];

    // Check if language file exists
    const pathLanguage = join(
      process.cwd(),
      "..",
      "frontend",
      "langs",
      "en",
      `${code}.json`
    );
    const language = fs.existsSync(pathLanguage);

    return {
      databases: databaseSchemaFiles,
      admin_pages: frontendAdminPages,
      admin_templates: frontendAdminTemplates,
      pages_container: frontendPagesContainer,
      pages: frontendPages,
      hooks: frontendHooks,
      templates: frontendTemplates,
      graphql_queries: frontendGraphQLQueries,
      graphql_mutations: frontendGraphQLMutations,
      language
    };
  }
}
