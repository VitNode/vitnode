import { Injectable } from '@nestjs/common';
import { Placeholder, SQL, eq } from 'drizzle-orm';
import { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';

import {
  HelpersParserTextLanguageCoreHelpersService,
  InfoFromTextLanguageContentReturnValues,
} from './helpers.service';

import { TextLanguageInput } from '@/utils';
import { DatabaseService } from '@/database';
import { CustomError } from '@/errors';

interface Args<T extends TableConfig> {
  data: TextLanguageInput[];
  database: PgTableWithColumns<T>;
  item_id: number;
}

interface ReturnValues extends TextLanguageInput {
  id: number;
  item_id: number;
}

@Injectable()
export class ParserTextLanguageCoreHelpersService extends HelpersParserTextLanguageCoreHelpersService {
  constructor(databaseService: DatabaseService) {
    super(databaseService);
  }

  protected async contentParser({
    content,
    infoOldData,
  }: {
    content: string;
    infoOldData: InfoFromTextLanguageContentReturnValues[];
  }) {
    const oldInfo = infoOldData.reduce(
      (acc, item) => {
        // Check if already exists file id
        item.fileIds.forEach(id => {
          if (!acc.fileIds.includes(id)) {
            acc.fileIds.push(id);
          }
        });

        return acc;
      },
      { fileIds: [] } as InfoFromTextLanguageContentReturnValues,
    );
    const info = this.getInfoFromContent({ content });

    await this.parseFiles({
      oldFileIds: oldInfo.fileIds,
      fileIds: info.fileIds,
    });
  }

  async parse<T extends TableConfig>({
    data,
    database,
    item_id,
  }: Args<T>): Promise<ReturnValues[]> {
    ['language_code', 'value', 'item_id'].forEach(key => {
      if (!database[key]) {
        throw new CustomError({
          code: 'DATABASE_COLUMN_NOT_FOUND',
          message: `Column ${key} not found in database`,
        });
      }
    });

    const oldData: ReturnValues[] = (await this.databaseService.db
      .select({
        id: database.id,
        language_code: database.language_code,
        value: database.value,
      })
      .from(database)
      .where(eq(database.item_id, item_id))) as unknown as ReturnValues[];

    const infoOldData: InfoFromTextLanguageContentReturnValues[] = oldData.map(
      item => this.getInfoFromContent({ content: item.value }),
    );

    const updateData: ReturnValues[] = await Promise.all(
      data.map(async item => {
        const itemExist = oldData.find(
          el => el.language_code === item.language_code,
        );

        await this.contentParser({
          content: item.value,
          infoOldData,
        });

        if (itemExist) {
          const update = await this.databaseService.db
            .update(database)
            .set({ ...item, item_id })
            .where(eq(database.id, itemExist.id))
            .returning();

          return update[0];
        }

        const data = await this.databaseService.db
          .insert(database)
          .values({ ...item, item_id } as {
            [Key in keyof PgTableWithColumns<T>['$inferInsert']]:
              | PgTableWithColumns<T>['$inferInsert'][Key]
              | Placeholder<string, unknown>
              | SQL<unknown>;
          })
          .returning();

        return data[0];
      }),
    );

    // Delete remaining translations
    await Promise.all(
      oldData.map(async item => {
        const exist = updateData.find(
          el => el.language_code === item.language_code,
        );
        if (exist) return;

        await this.contentParser({
          content: '',
          infoOldData,
        });

        await this.databaseService.db
          .delete(database)
          .where(eq(database.id, item.id));
      }),
    );

    // Reset state
    this.state = {
      fileIds: [],
    };

    return updateData;
  }

  async delete<T extends TableConfig>({
    database,
    item_id,
  }: Omit<Args<T>, 'data'>) {
    ['language_code', 'value', 'item_id'].forEach(key => {
      if (!database[key]) {
        throw new CustomError({
          code: 'DATABASE_COLUMN_NOT_FOUND',
          message: `Column ${key} not found in database`,
        });
      }
    });

    const oldData: ReturnValues[] = (await this.databaseService.db
      .select({
        id: database.id,
        language_code: database.language_code,
        value: database.value,
      })
      .from(database)
      .where(eq(database.item_id, item_id))) as unknown as ReturnValues[];

    const infoOldData: InfoFromTextLanguageContentReturnValues[] = oldData.map(
      item => this.getInfoFromContent({ content: item.value }),
    );

    await this.contentParser({
      content: '',
      infoOldData,
    });
  }
}
