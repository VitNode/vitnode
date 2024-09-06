import { CustomError } from '@/errors';
import { StringLanguageInput } from '@/utils';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq, Placeholder, SQL } from 'drizzle-orm';
import { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';

import {
  HelpersParserStringLanguageCoreHelpersService,
  InfoFromStringLanguageContentReturnValues,
} from './helpers.service';

interface Args<T extends TableConfig> {
  data: StringLanguageInput[];
  database: PgTableWithColumns<T>;
  item_id: number;
}

interface ReturnValues extends StringLanguageInput {
  id: number;
  item_id: number;
}

@Injectable()
export class ParserStringLanguageCoreHelpersService extends HelpersParserStringLanguageCoreHelpersService {
  constructor(databaseService: InternalDatabaseService) {
    super(databaseService);
  }

  protected async contentParser({
    content,
    infoOldData,
  }: {
    content: string;
    infoOldData: InfoFromStringLanguageContentReturnValues[];
  }) {
    const oldInfo =
      infoOldData.reduce<InfoFromStringLanguageContentReturnValues>(
        (acc, item) => {
          // Check if already exists file id
          item.fileIds.forEach(id => {
            if (!acc.fileIds.includes(id)) {
              acc.fileIds.push(id);
            }
          });

          return acc;
        },
        { fileIds: [] },
      );
    const info = this.getInfoFromContent({ content });

    await this.parseFiles({
      oldFileIds: oldInfo.fileIds,
      fileIds: info.fileIds,
    });
  }

  async delete<T extends TableConfig>({
    database,
    item_id,
  }: Omit<Args<T>, 'data'>) {
    ['language_code', 'value', 'item_id'].forEach(key => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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

    const infoOldData: InfoFromStringLanguageContentReturnValues[] =
      oldData.map(item => this.getInfoFromContent({ content: item.value }));

    await this.contentParser({
      content: '',
      infoOldData,
    });
  }

  async parse<T extends TableConfig>({
    data,
    database,
    item_id,
  }: Args<T>): Promise<ReturnValues[]> {
    ['language_code', 'value', 'item_id'].forEach(key => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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

    const infoOldData: InfoFromStringLanguageContentReturnValues[] =
      oldData.map(item => this.getInfoFromContent({ content: item.value }));

    // Update
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
            .set({ ...item, item_id } as {
              [Key in keyof PgTableWithColumns<T>['$inferInsert']]:
                | PgTableWithColumns<T>['$inferInsert'][Key]
                | Placeholder<string, unknown>
                | SQL;
            })
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
              | SQL;
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
}
