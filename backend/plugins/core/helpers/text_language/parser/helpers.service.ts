import { Injectable } from "@nestjs/common";

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
