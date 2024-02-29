import { existsSync, unlink } from "fs";

import { Injectable } from "@nestjs/common";

import { DeleteCoreFilesArgs } from "./dto/delete.args";

import { CustomError } from "@/src/utils/errors/CustomError";

@Injectable()
export class DeleteCoreFilesService {
  checkIfFileExists({ dir_folder, name }: DeleteCoreFilesArgs) {
    // Check if folder exists
    if (!existsSync(dir_folder)) {
      throw new CustomError({
        code: "FOLDER_NOT_FOUND",
        message: `Folder "${dir_folder}" not found`
      });
    }

    // Check if file exists
    if (!existsSync(`${dir_folder}/${name}`)) {
      throw new CustomError({
        code: "FILE_NOT_FOUND",
        message: `File "${name}" not found`
      });
    }
  }

  delete({ dir_folder, name }: DeleteCoreFilesArgs) {
    this.checkIfFileExists({ dir_folder, name });

    // Remove file from server
    unlink(`${dir_folder}/${name}`, err => {
      // eslint-disable-next-line no-console
      if (err) console.error(err);
    });

    return "Success!";
  }
}
