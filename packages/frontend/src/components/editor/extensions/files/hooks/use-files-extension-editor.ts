import { FilesAuthorizationCoreSessions } from '@/graphql/types';
import { useGlobals } from '@/hooks/use-globals';
import { useSession } from '@/hooks/use-session';
import { useSessionAdmin } from '@/hooks/use-session-admin';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import {
  acceptMimeTypeImage,
  acceptMimeTypeVideo,
  FileStateEditor,
} from '../files';
import { deleteMutationApi } from './delete-mutation-api';
import { uploadMutationApi } from './upload-mutation-api';

export const useFilesExtensionEditor = ({
  allowUploadFiles,
}: {
  allowUploadFiles?: {
    folder: string;
    plugin: string;
  };
}) => {
  const tCore = useTranslations('core.errors');
  const session = useSession();
  const adminSession = useSessionAdmin();
  const { config } = useGlobals();
  const permissionFiles: FilesAuthorizationCoreSessions = {
    allow_upload: session.files.allow_upload || adminSession.files.allow_upload,
    max_storage_for_submit:
      session.files.max_storage_for_submit ||
      adminSession.files.max_storage_for_submit,
    space_used: session.files.space_used || adminSession.files.space_used,
    total_max_storage:
      session.files.total_max_storage || adminSession.files.total_max_storage,
  };

  const handleDelete = async ({
    id,
    securityKey,
  }: {
    id: number;
    securityKey: string | undefined;
  }) => {
    const mutation = await deleteMutationApi({
      id,
      securityKey,
    });

    if (mutation?.error) {
      toast.error(tCore('title'), {
        description: tCore('internal_server_error'),
      });
    }
  };

  const validateMimeTypeFile = (file: FileStateEditor): FileStateEditor => {
    if (file.error)
      return { ...file, error: 'Internal Server Error', isLoading: false };

    const { allow_type } = config.editor.files;

    if (allow_type === 'all') return file;

    const isValidType = (types: string[]) =>
      types.includes(file.file?.type ?? '');

    if (allow_type === 'images_videos') {
      if (!isValidType([...acceptMimeTypeImage, ...acceptMimeTypeVideo])) {
        return { ...file, error: 'Invalid file type', isLoading: false };
      }
    } else if (allow_type === 'images') {
      if (!isValidType(acceptMimeTypeImage)) {
        return { ...file, error: 'Invalid file type', isLoading: false };
      }
    }

    return file;
  };

  const validateSizeFile = ({
    file,
    fileState,
  }: {
    file: FileStateEditor;
    fileState: FileStateEditor[];
  }): FileStateEditor => {
    if (file.error)
      return { ...file, error: 'Internal Server Error', isLoading: false };

    if (
      permissionFiles.max_storage_for_submit === 0 &&
      permissionFiles.total_max_storage === 0
    ) {
      return file;
    }

    const remainingStorage =
      permissionFiles.total_max_storage !== 0
        ? permissionFiles.total_max_storage - permissionFiles.space_used
        : 0;

    const maxStorage = (() => {
      if (remainingStorage) {
        return permissionFiles.max_storage_for_submit
          ? Math.min(permissionFiles.max_storage_for_submit, remainingStorage)
          : remainingStorage;
      }

      return permissionFiles.max_storage_for_submit || -1;
    })();
    const totalSize = [file, ...fileState.filter(i => i.id !== file.id)].reduce(
      (acc, file) => {
        if (file.data) return acc + file.data.file_size;
        if (file.file) return acc + file.file.size;

        return acc;
      },
      0,
    );

    if (totalSize > maxStorage && maxStorage !== -1) {
      return { ...file, error: 'Max storage exceeded', isLoading: false };
    }

    return file;
  };

  const checkUploadFile = ({
    file,
    fileState,
  }: {
    file: FileStateEditor;
    fileState: FileStateEditor[];
  }) => {
    if (
      !allowUploadFiles ||
      config.editor.files.allow_type === 'none' ||
      !permissionFiles.allow_upload
    ) {
      return;
    }

    const fileAfterCheckMineType = validateMimeTypeFile(file);
    if (fileAfterCheckMineType.error) return fileAfterCheckMineType;
    const fileAfterCheckSize = validateSizeFile({
      file: fileAfterCheckMineType,
      fileState,
    });
    if (fileAfterCheckSize.error) return fileAfterCheckSize;

    return file;
  };

  const uploadFile = async (
    file: FileStateEditor,
  ): Promise<FileStateEditor> => {
    const formData = new FormData();
    if (!file.file || !allowUploadFiles) {
      return { ...file, error: 'Internal Server Error', isLoading: false };
    }
    formData.append('file', file.file);
    formData.append('plugin', allowUploadFiles.plugin);
    formData.append('folder', allowUploadFiles.folder);
    const mutation = await uploadMutationApi(formData);

    if (mutation.error || !mutation.data?.core_editor_files__upload) {
      return { ...file, error: 'Internal Server Error', isLoading: false };
    }
    const { core_editor_files__upload } = mutation.data;

    return {
      data: core_editor_files__upload,
      id: core_editor_files__upload.id,
      isLoading: false,
      error: '',
    };
  };

  return { handleDelete, checkUploadFile, uploadFile };
};
