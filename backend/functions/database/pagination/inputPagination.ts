import { CustomError } from '../../../utils/errors/CustomError';

interface Args<T> {
  cursor: T | undefined;
  first: number | undefined;
  last: number | undefined;
}

interface Return<T> {
  skip: number;
  take: number;
  cursor?: {
    id: T;
  };
}

export function inputPagination<T>({ cursor, first, last }: Args<T>): Return<T> | object {
  if (!first && !last) {
    return {};
  }

  if (!cursor) {
    if (!first) {
      throw new CustomError({
        code: 'PAGINATION_ERROR',
        message: 'You must provide first argument when cursor is not provided'
      });
    }

    return {
      take: first,
      skip: 0
    };
  }

  return {
    take: last ? -last - 1 : first + 1,
    skip: 1, // Skip the cursor
    cursor: {
      id: cursor
    }
  };
}
