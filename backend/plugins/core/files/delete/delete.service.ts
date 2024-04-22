import { existsSync, unlink } from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";

import { DeleteCoreFilesArgs } from "./dto/delete.args";

import { CustomError } from "@/utils/errors/CustomError";

@Injectable()
export class DeleteCoreFilesService {
  checkIfFileExists({ dir_folder, file_name }: DeleteCoreFilesArgs) {
    const path = join(process.cwd(), "..", "frontend", "public", dir_folder);
    // Check if folder exists
    if (!existsSync(path)) {
      throw new CustomError({
        code: "FOLDER_NOT_FOUND",
        message: `Folder "${path}" not found`
      });
    }

    // Check if file exists
    if (!existsSync(`${path}/${file_name}`)) {
      throw new CustomError({
        code: "FILE_NOT_FOUND",
        message: `File "${file_name}" not found`
      });
    }
  }

  delete({ dir_folder, file_name }: DeleteCoreFilesArgs) {
    this.checkIfFileExists({ dir_folder, file_name });

    // Remove file from server
    const path = join(process.cwd(), "..", "frontend", "public", dir_folder);
    unlink(`${path}/${file_name}`, err => {
      // eslint-disable-next-line no-console
      if (err) console.error(err);
    });

    return "Success!";
  }
}
