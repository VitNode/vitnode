import { core_languages_words } from '@/database/schema/languages';
import { NotFoundError } from '@/errors';
import { InternalDatabaseService, StringLanguage } from '@/utils';
import { Injectable } from '@nestjs/common';
import { and, eq, getTableName } from 'drizzle-orm';
import { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';

import { ParseStringLanguageHelper } from './parse.service';

@Injectable()
export class StringLanguageHelper extends ParseStringLanguageHelper {
  constructor(databaseService: InternalDatabaseService) {
    super(databaseService);
  }

  async delete<T extends TableConfig>({
    plugin_code,
    item_id,
    database,
  }: {
    database: PgTableWithColumns<T>;
    item_id: number;
    plugin_code: string;
  }) {
    await this.databaseService.db
      .delete(core_languages_words)
      .where(
        and(
          eq(core_languages_words.plugin_code, plugin_code),
          eq(core_languages_words.item_id, item_id),
          eq(core_languages_words.table_name, getTableName(database)),
        ),
      );
  }

  async parse<T extends TableConfig>({
    plugin_code,
    item_id,
    database,
    data,
    variable,
  }: {
    data: StringLanguage[];
    database: PgTableWithColumns<T>;
    item_id: number;
    plugin_code: string;
    variable: string;
  }) {
    // Check if plugin exists
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, plugin_code),
    });

    if (!plugin && plugin_code !== 'core') {
      throw new NotFoundError('Plugin for String Language');
    }
    const tableName = getTableName(database);

    // Get old strings
    const oldString =
      await this.databaseService.db.query.core_languages_words.findMany({
        where: (table, { eq, and }) =>
          and(
            eq(table.plugin_code, plugin_code),
            eq(table.item_id, item_id),
            eq(table.table_name, tableName),
            eq(table.variable, variable),
          ),
      });

    const updateData = await Promise.all(
      data.map(async item => {
        const itemExist = oldString.find(
          value => value.language_code === item.language_code,
        );

        if (itemExist) {
          const [update] = await this.databaseService.db
            .update(core_languages_words)
            .set({
              value: item.value,
            })
            .where(eq(core_languages_words.id, itemExist.id))
            .returning();

          return update;
        }

        const [insert] = await this.databaseService.db
          .insert(core_languages_words)
          .values({
            language_code: item.language_code,
            plugin_code,
            item_id,
            value: item.value,
            table_name: tableName,
            variable,
          })
          .returning();

        return insert;
      }),
    );

    // Delete remaining strings
    await Promise.all(
      oldString.map(async item => {
        const exist = updateData.find(
          el => el.language_code === item.language_code,
        );
        if (exist) return;

        await this.databaseService.db
          .delete(core_languages_words)
          .where(eq(core_languages_words.id, item.id));
      }),
    );

    return updateData;
  }
}
