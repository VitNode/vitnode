interface Args {
  cursor: string | undefined;
  first: number;
}

interface Return {
  skip: number;
  take: number;
  cursor?: {
    id: string;
  };
}

export const inputPagination = ({ cursor, first }: Args): Return => {
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
};
