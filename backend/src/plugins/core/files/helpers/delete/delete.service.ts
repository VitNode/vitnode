import { existsSync, unlink } from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";

import { DeleteCoreFilesArgs } from "./dto/delete.args";
import { CustomError } from "@/utils/errors/custom-error";
import { ABSOLUTE_PATHS } from "@/config";

@Injectable()
export class DeleteCoreFilesService {
  checkIfFileExists(path: string) {
    // Check if file exists
    if (!existsSync(path)) {
      throw new CustomError({
        code: "FILE_NOT_FOUND",
        message: `File "${path}" not found`
      });
    }
  }

  delete({ dir_folder, file_name, file_secure }: DeleteCoreFilesArgs) {
    const path = file_secure
      ? join(ABSOLUTE_PATHS.uploads.private, dir_folder)
      : join(ABSOLUTE_PATHS.uploads.public, dir_folder);
    this.checkIfFileExists(`${path}/${file_name}`);

    // Remove file from server
    unlink(`${path}/${file_name}`, err => {
      // eslint-disable-next-line no-console
      if (err) console.error(err);
    });

    return "Success!";
  }
}
