import { Injectable } from "@nestjs/common";
import { Placeholder, SQL, eq } from "drizzle-orm";
import { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";

import { DatabaseService } from "@/plugins/database/database.service";
import { TextLanguageInput } from "@/types/database/text-language.type";
import { CustomError } from "@/utils/errors/CustomError";

interface Args<T extends TableConfig> {
  data: TextLanguageInput[];
  database: PgTableWithColumns<T>;
  // plugin: string;
  // folder: string;
  item_id: number;
}

interface ReturnValues extends TextLanguageInput {
  id: number;
  item_id: number;
}

@Injectable()
export class ParserTextLanguageCoreHelpersService {
  constructor(private databaseService: DatabaseService) {}

  async parse<T extends TableConfig>({
    // plugin,
    // folder,
    data,
    database,
    item_id
  }: Args<T>): Promise<ReturnValues[]> {
    ["language_code", "value", "item_id"].forEach(key => {
      if (!database[key]) {
        throw new CustomError({
          code: "DATABASE_COLUMN_NOT_FOUND",
          message: `Column ${key} not found in database`
        });
      }
    });

    if (!data.length) {
      return [];
    }

    const oldData: ReturnValues[] = (await this.databaseService.db
      .select({
        id: database.id,
        language_code: database.language_code,
        value: database.value
      })
      .from(database)
      .where(eq(database.item_id, item_id))) as unknown as ReturnValues[];

    const parseData: Promise<ReturnValues[]> = Promise.all(
      data.map(async item => {
        const itemExist = oldData.find(
          el => el.language_code === item.language_code
        );

        if (itemExist) {
          const update = await this.databaseService.db
            .update(database)
            .set({ ...item, item_id })
            .where(eq(database.id, itemExist.id))
            .returning();

          return update[0];
        }

        await this.databaseService.db
          .insert(database)
          .values({ ...item, item_id } as {
            [Key in keyof PgTableWithColumns<T>["$inferInsert"]]:
              | SQL<unknown>
              | Placeholder<string, unknown>
              | PgTableWithColumns<T>["$inferInsert"][Key];
          })
          .returning();
      })
    );

    // Delete remaining translations
    await Promise.all(
      oldData.map(async item => {
        const exist = await parseData.then(data =>
          data.find(name => name.id === item.id)
        );
        if (exist) return;

        await this.databaseService.db
          .delete(database)
          .where(eq(database.id, item.id));
      })
    );

    return parseData;
  }
}
