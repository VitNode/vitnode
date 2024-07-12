import React from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { formatBytes } from 'vitnode-shared';
import { useGlobals } from 'vitnode-frontend/hooks/use-globals';
import { useSession } from 'vitnode-frontend/hooks/use-session';

import {
  acceptMimeTypeImage,
  acceptMimeTypeVideo,
  FileStateEditor,
} from '../files';
import { uploadMutationApi } from './upload-mutation-api';
import { getFilesFromContent } from './functions';
import { TextLanguage } from '@/graphql/graphql';

export interface UploadFilesHandlerArgs {
  files: FileStateEditor[];
  finishUpload?: (file: FileStateEditor) => void;
}

export interface UploadFilesHandlerEditorArgs {
  value: TextLanguage[] | string;
  allowUploadFiles?: {
    folder: string;
    plugin: string;
  };
}

export const useUploadFilesHandlerEditor = ({
  allowUploadFiles,
  value,
}: UploadFilesHandlerEditorArgs) => {
  const { files: permissionFiles } = useSession();
  const { config } = useGlobals();
  const [files, setFiles] = React.useState<FileStateEditor[]>(
    Array.isArray(value) ? getFilesFromContent(value) : [],
  );
  const t = useTranslations('core.editor.files');
  const tCore = useTranslations('core');

  const handleUpload = async ({
    data,
    finishUpload,
  }: {
    data: FileStateEditor;
    finishUpload?: (file: FileStateEditor) => void;
  }) => {
    try {
      const formData = new FormData();
      if (!data.file || !allowUploadFiles) return;
      formData.append('file', data.file);
      formData.append('plugin', allowUploadFiles.plugin);
      formData.append('folder', allowUploadFiles.folder);
      const mutation = await uploadMutationApi(formData);

      setFiles(prev =>
        prev.map(item => {
          if (item.id === data.id) {
            return {
              ...item,
              data: mutation.core_editor_files__upload,
              isLoading: false,
              id: mutation.core_editor_files__upload.id,
            };
          }

          return item;
        }),
      );

      finishUpload?.({
        ...data,
        data: mutation.core_editor_files__upload,
        id: mutation.core_editor_files__upload.id,
        isLoading: false,
      });
    } catch (error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }
  };

  const validateMineTypeFiles = (
    files: FileStateEditor[],
  ): FileStateEditor[] => {
    // console.log(files);
    if (config.editor.files.allow_type === 'all') return files;

    return files.filter(file => {
      if (config.editor.files.allow_type === 'images_videos') {
        return [...acceptMimeTypeImage, ...acceptMimeTypeVideo].includes(
          file.file?.type || '',
        );
      }

      if (config.editor.files.allow_type === 'images') {
        return acceptMimeTypeImage.includes(file.file?.type || '');
      }
    });
  };

  const validateSizeFiles = (items: FileStateEditor[]): FileStateEditor[] => {
    const remainingStorage =
      permissionFiles.total_max_storage - permissionFiles.space_used;
    const max =
      remainingStorage < permissionFiles.max_storage_for_submit &&
      remainingStorage > 0
        ? remainingStorage
        : permissionFiles.max_storage_for_submit;
    const totalSize = [...files, ...items].reduce((acc, file) => {
      if (!file.file) return acc;

      return acc + file.file.size;
    }, 0);

    if (totalSize > max) {
      toast.error(t('errors.max_storage_for_submit.title'), {
        description: t.rich('errors.max_storage_for_submit.desc', {
          size: formatBytes(max),
        }),
      });

      return [];
    }

    return items;
  };

  const uploadFiles = async ({
    files,
    finishUpload,
  }: UploadFilesHandlerArgs) => {
    if (
      !files.length ||
      !allowUploadFiles ||
      config.editor.files.allow_type === 'none' ||
      !permissionFiles.allow_upload
    ) {
      return;
    }

    const validateMineType = validateMineTypeFiles(files);

    if (validateMineType.length !== files.length) {
      toast.error(t('errors.invalid_file_type.title'), {
        description: t('errors.invalid_file_type.desc', {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          types: t(config.editor.files.allow_type),
        }),
      });
    }
    if (!validateMineType.length) return;

    const validateSize = validateSizeFiles(validateMineType);
    if (!validateSize.length) return;

    setFiles(prev => [...prev, ...validateMineType]);
    await Promise.all(
      validateMineType.map(async data => {
        await handleUpload({ data, finishUpload });
      }),
    );
  };

  return { uploadFiles, files, setFiles };
};
