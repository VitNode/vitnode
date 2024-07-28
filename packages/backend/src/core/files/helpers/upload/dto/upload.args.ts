import { FileUpload } from '@/graphql-upload';

export interface UploadCoreFilesArgs {
  acceptMimeType: string[];
  files: Promise<FileUpload>[];
  folder: string;
  maxUploadSizeBytes: number;
  plugin: string;
  secure?: boolean | null;
}
