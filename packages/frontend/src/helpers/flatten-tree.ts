export type WithChildren<T extends object> = Omit<
  T,
  "__typename" | "children"
> & {
  children: WithChildren<T>[];
  id: number | string;
};

export type FlatTree<T extends object> = WithChildren<T> & {
  depth: number;
  parentId: number | string | null;
};

export function flattenTree<T extends object>({
  depth = 0,
  parentId = null,
  tree
}: {
  tree: WithChildren<T>[];
  depth?: number;
  parentId?: number | string | null;
}): FlatTree<T>[] {
  return tree.reduce<FlatTree<T>[]>((previousValue, currentValue) => {
    const children = currentValue.children
      ? flattenTree({
          tree: currentValue.children,
          parentId: currentValue.id,
          depth: depth + 1
        })
      : [];

    return [
      ...previousValue,
      {
        ...currentValue,
        parentId: parentId,
        depth: depth,
        children
      },
      ...children
    ];
  }, []);
}
