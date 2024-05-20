import { DatabaseService } from "@/database/database.service";
import { Ctx } from "@/utils/types/context.type";
import { ConfigService } from "@nestjs/config";

export const getThemeId = async ({
  ctx,
  databaseService,
  configService
}: {
  ctx: Pick<Ctx, "req">;
  databaseService: DatabaseService;
  configService: ConfigService;
}): Promise<number> => {
  const cookie_theme_id: string | null =
    ctx.req.cookies[configService.getOrThrow("cookies.theme_id.name")];

  const theme = await databaseService.db.query.core_themes.findFirst({
    where: (table, { eq }) => eq(table.id, parseInt(cookie_theme_id) ?? 1)
  });

  if (!cookie_theme_id || !theme) {
    return 1;
  }

  return theme.id;
};
