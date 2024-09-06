import { InternalDatabaseService } from '@/utils';

interface StringLanguageJSONContentType {
  attrs?: { id: number };
  content?: StringLanguageJSONContentType[];
  type: string;
}

export class ParseStringLanguageHelper {
  constructor(protected databaseService: InternalDatabaseService) {}

  private parseInfoFromContent(content: string) {
    const fileIds: number[] = [];

    const mapContent = (values: StringLanguageJSONContentType[]) => {
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
      const json = JSON.parse(content)
        .content as StringLanguageJSONContentType[];

      mapContent(json);
    } catch (_) {
      // Skip if content is not JSON
    }

    return { fileIds };
  }
}
