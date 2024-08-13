import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { core_files_using } from '@/database/schema/files';
interface TextLanguageJSONContentType {
  type: string;
  attrs?: { id: number };
  content?: TextLanguageJSONContentType[];
}

export interface InfoFromTextLanguageContentReturnValues {
  fileIds: number[];
}

@Injectable()
export class HelpersParserTextLanguageCoreHelpersService {
  protected state: InfoFromTextLanguageContentReturnValues = {
    fileIds: [],
  };

  constructor(protected databaseService: InternalDatabaseService) {}

  protected async parseFiles({
    fileIds,
    oldFileIds,
  }: {
    fileIds: InfoFromTextLanguageContentReturnValues['fileIds'];
    oldFileIds: InfoFromTextLanguageContentReturnValues['fileIds'];
  }) {
    await Promise.all(
      fileIds.map(async id => {
        if (this.state.fileIds.includes(id)) return;

        this.state.fileIds.push(id);

        if (oldFileIds.includes(id)) return;

        await this.databaseService.db.insert(core_files_using).values({
          file_id: id,
          plugin: 'core',
          folder: 'text-language',
        });
      }),
    );

    // Delete remaining files
    await Promise.all(
      oldFileIds.map(async id => {
        const exist = this.state.fileIds.find(fileId => fileId === id);
        if (exist) return;

        const fileUsing =
          await this.databaseService.db.query.core_files_using.findFirst({
            where: (table, { eq }) => eq(table.file_id, id),
          });

        if (!fileUsing) return;

        await this.databaseService.db
          .delete(core_files_using)
          .where(eq(core_files_using.id, fileUsing.id));
      }),
    );
  }

  protected getInfoFromContent({
    content,
  }: {
    content: string;
  }): InfoFromTextLanguageContentReturnValues {
    const fileIds: number[] = [];

    const mapContent = (values: TextLanguageJSONContentType[]) => {
      values.forEach(value => {
        if (!value.attrs) return;

        // Get all file ids
        if (value.type === 'files' && !fileIds.includes(value.attrs.id)) {
          fileIds.push(value.attrs.id);
        }

        if (value.content) {
          mapContent(value.content);
        }
      });
    };

    try {
      const json = JSON.parse(content).content as TextLanguageJSONContentType[];

      mapContent(json);
    } catch (error) {
      /* empty */
    }

    return { fileIds };
  }
}
