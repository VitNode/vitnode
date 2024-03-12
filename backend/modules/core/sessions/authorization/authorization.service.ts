import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { InternalAuthorizationCoreSessionsService } from "./internal/internal_authorization.service";
import { AuthorizationCoreSessionsObj } from "./dto/authorization.obj";

import { Ctx } from "@/types/context.type";
import { DatabaseService } from "@/modules/database/database.service";
import { getConfigFile } from "@/functions/config/get-config-file";

@Injectable()
export class AuthorizationCoreSessionsService {
  constructor(
    private databaseService: DatabaseService,
    private readonly service: InternalAuthorizationCoreSessionsService,
    private configService: ConfigService
  ) {}

  protected async getThemeId({
    req
  }: Pick<Ctx, "req">): Promise<number | null> {
    const cookie_theme_id: string | null =
      req.cookies[this.configService.getOrThrow("cookies.theme_id.name")];

    if (cookie_theme_id) {
      const theme = await this.databaseService.db.query.core_themes.findFirst({
        where: (table, { eq }) => eq(table.id, parseInt(cookie_theme_id))
      });

      if (theme) {
        return theme.id;
      }
    }

    return null;
  }

  protected async isAdmin({
    group_id,
    user_id
  }: {
    group_id: number;
    user_id: number;
  }): Promise<boolean> {
    return !!(await this.databaseService.db.query.core_admin_permissions.findFirst(
      {
        where: (table, { eq, or }) =>
          or(eq(table.group_id, group_id), eq(table.user_id, user_id))
      }
    ));
  }

  protected async isMod({
    group_id,
    user_id
  }: {
    group_id: number;
    user_id: number;
  }): Promise<boolean> {
    return !!(await this.databaseService.db.query.core_moderators_permissions.findFirst(
      {
        where: (table, { eq, or }) =>
          or(eq(table.group_id, group_id), eq(table.user_id, user_id))
      }
    ));
  }

  async authorization({
    req,
    res
  }: Ctx): Promise<AuthorizationCoreSessionsObj> {
    const theme_id = await this.getThemeId({ req });
    const config = await getConfigFile();
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.default, true)
    });

    try {
      const currentUser = await this.service.authorization({ req, res });

      const user = await this.databaseService.db.query.core_users.findFirst({
        where: (table, { eq }) => eq(table.id, currentUser.id),
        with: {
          avatar: true,
          group: {
            with: {
              name: true
            }
          }
        }
      });

      return {
        user: {
          ...user,
          is_admin: await this.isAdmin({
            group_id: user.group.id,
            user_id: user.id
          }),
          is_mod: await this.isMod({
            group_id: user.group.id,
            user_id: user.id
          }),
          avatar_color: user.avatar_color
        },
        theme_id,
        rebuild_required: config.rebuild_required,
        plugin_default: plugin.code
      };
    } catch (error) {
      return {
        user: null,
        theme_id,
        rebuild_required: config.rebuild_required,
        plugin_default: plugin.code
      };
    }
  }
}
