import { join } from "path";
import * as fs from "fs";

import { CustomError } from "@vitnode/backend";

interface Args {
  destinationPath: string;
  tempPath: string;
}

export class ChangeTemplatesAdminThemesService {
  async changeTemplates({ destinationPath, tempPath }: Args) {
    try {
      const files = (
        await fs.promises.readdir(tempPath, {
          recursive: true
        })
      ).filter(file => file.includes("."));

      await Promise.all(
        files.map(async file => {
          // If file does not exist, copy
          if (!fs.existsSync(join(destinationPath, file))) {
            await fs.promises.cp(
              join(tempPath, file),
              join(destinationPath, file),
              {
                recursive: true
              }
            );

            return;
          }

          const fileContent = fs.readFileSync(
            join(destinationPath, file),
            "utf8"
          );

          if (fileContent.includes("// ! no-replace")) {
            return;
          }

          await fs.promises.cp(
            join(tempPath, file),
            join(destinationPath, file),
            {
              recursive: true
            }
          );
        })
      );
    } catch (error) {
      throw new CustomError({
        code: "COPY_FILES_TO_THEME_FOLDER_ERROR",
        message: `Source: ${tempPath}, Destination: ${destinationPath}, Error: ${error}`
      });
    }
  }
}
