import { ConfigService } from "@nestjs/config";
import { Ctx } from "@vitnode/backend";

import { DatabaseService } from "@/database/database.service";

export const getThemeId = async ({
  ctx,
  databaseService,
  configService
}: {
  configService: ConfigService;
  ctx: Pick<Ctx, "req">;
  databaseService: DatabaseService;
}): Promise<number> => {
  const cookie_theme_id: string | null =
    ctx.req.cookies[configService.getOrThrow("cookies.theme_id.name")];

  const theme = await databaseService.db.query.core_themes.findFirst({
    where: (table, { eq }) =>
      eq(table.id, cookie_theme_id ? parseInt(cookie_theme_id) : 1)
  });

  if (theme) {
    return theme.id;
  }

  const defaultTheme = await databaseService.db.query.core_themes.findFirst({
    where: (table, { eq }) => eq(table.default, true)
  });

  if (!cookie_theme_id || !defaultTheme) {
    return 1;
  }

  return defaultTheme.id;
};
