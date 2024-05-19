import { ReadStream, ReadStreamOptions, WriteStream } from "./fs-capacitor";

interface FileUploadCreateReadStreamOptions {
  encoding: ReadStreamOptions["encoding"];
  highWaterMark: ReadStreamOptions["highWaterMark"];
}

type FileUploadCreateReadStream = (
  options?: FileUploadCreateReadStreamOptions
) => ReadStream;

export interface FileUpload {
  capacitor: WriteStream;
  createReadStream: FileUploadCreateReadStream;
  encoding: string;
  filename: string;
  mimetype: string;
}

export default class Upload {
  file?: FileUpload;
  promise: Promise<FileUpload>;
  resolve: (file: FileUpload) => void;
  reject: (error: Error) => void;

  constructor() {
    /**
     * Promise that resolves file upload details. This should only be utilized
     * by {@linkcode GraphQLUpload}.
     */
    this.promise = new Promise((resolve, reject) => {
      /**
       * Resolves the upload promise with the file upload details. This should
       * only be utilized by {@linkcode processRequest}.
       */
      this.resolve = (file: FileUpload) => {
        /**
         * The file upload details, available when the
         * {@linkcode Upload.promise} resolves. This should only be utilized by
         * {@linkcode processRequest}.
         * @type {import("./processRequest.mjs").FileUpload | undefined}
         */
        this.file = file;

        resolve(file);
      };

      /**
       * Rejects the upload promise with an error. This should only be
       * utilized by {@linkcode processRequest}.
       */
      this.reject = reject;
    });

    // Prevent errors crashing Node.js, see:
    // https://github.com/nodejs/node/issues/20392
    this.promise.catch(() => {});
  }
}
