import { existsSync, unlink } from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";

import { DeleteCoreFilesArgs } from "./dto/delete.args";

import { ABSOLUTE_PATHS_BACKEND, CustomError } from "../../../..";

@Injectable()
export class DeleteCoreFilesService {
  checkIfFileExistsAndReturnPath({
    dir_folder,
    file_name,
    file_secure
  }: DeleteCoreFilesArgs) {
    const path = file_secure
      ? ABSOLUTE_PATHS_BACKEND.uploads.private
      : ABSOLUTE_PATHS_BACKEND.uploads.public;

    const filePath = join(path, dir_folder, file_name);

    // Check if file exists
    if (!existsSync(filePath)) {
      throw new CustomError({
        code: "FILE_NOT_FOUND",
        message: `File "${filePath}" not found`
      });
    }

    return filePath;
  }

  delete({ dir_folder, file_name, file_secure }: DeleteCoreFilesArgs) {
    const path = this.checkIfFileExistsAndReturnPath({
      dir_folder,
      file_name,
      file_secure
    });

    // Remove file from server
    unlink(path, err => {
      // eslint-disable-next-line no-console
      if (err) console.error(err);
    });

    return "Success!";
  }
}
