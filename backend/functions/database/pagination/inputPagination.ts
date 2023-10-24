interface Args<T> {
  cursor: T | undefined;
  first: number;
}

interface Return<T> {
  skip: number;
  take: number;
  cursor?: {
    id: T;
  };
}

export function inputPagination<T>({ cursor, first }: Args<T>): Return<T> {
  if (!cursor) {
    return {
      take: first,
      skip: 0
    };
  }

  return {
    take: first,
    skip: 1, // Skip the cursor
    cursor: {
      id: cursor
    }
  };
}
