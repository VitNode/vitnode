import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { core_files_using } from "@/plugins/core/admin/database/schema/files";
import { DatabaseService } from "@/database/database.service";

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
  constructor(protected databaseService: DatabaseService) {}

  protected state: InfoFromTextLanguageContentReturnValues = {
    fileIds: []
  };

  protected async parseFiles({
    fileIds,
    oldFileIds
  }: {
    fileIds: InfoFromTextLanguageContentReturnValues["fileIds"];
    oldFileIds: InfoFromTextLanguageContentReturnValues["fileIds"];
  }) {
    await Promise.all(
      fileIds.map(async id => {
        if (this.state.fileIds.includes(id)) return;

        this.state.fileIds.push(id);

        if (oldFileIds.includes(id)) return;

        await this.databaseService.db.insert(core_files_using).values({
          file_id: id,
          plugin: "core",
          folder: "text-language"
        });
      })
    );

    // Delete remaining files
    await Promise.all(
      oldFileIds.map(async id => {
        const exist = this.state.fileIds.find(fileId => fileId === id);
        if (exist) return;

        const fileUsing =
          await this.databaseService.db.query.core_files_using.findFirst({
            where: (table, { eq }) => eq(table.file_id, id)
          });

        await this.databaseService.db
          .delete(core_files_using)
          .where(eq(core_files_using.id, fileUsing.id));
      })
    );
  }

  protected getInfoFromContent({
    content
  }: {
    content: string;
  }): InfoFromTextLanguageContentReturnValues {
    const fileIds: number[] = [];

    const mapContent = (values: TextLanguageJSONContentType[]) => {
      values.forEach(value => {
        // Get all file ids
        if (value.type === "files" && !fileIds.includes(value.attrs.id)) {
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
