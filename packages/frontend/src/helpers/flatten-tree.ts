export type WithChildren<T extends object> = {
  children: WithChildren<T>[];
  id: number | string;
} & Omit<T, '__typename' | 'children'>;

export type FlatTree<T extends object> = {
  depth: number;
  parentId: null | number | string;
} & WithChildren<T>;

export function flattenTree<T extends object>({
  depth = 0,
  parentId = null,
  tree,
}: {
  depth?: number;
  parentId?: null | number | string;
  tree: WithChildren<T>[];
}): FlatTree<T>[] {
  return tree.reduce<FlatTree<T>[]>((previousValue, currentValue) => {
    const children =
      currentValue.children.length > 0
        ? flattenTree({
            tree: currentValue.children,
            parentId: currentValue.id,
            depth: depth + 1,
          })
        : [];

    return [
      ...previousValue,
      {
        ...currentValue,
        parentId: parentId,
        depth: depth,
        children,
      },
      ...children,
    ];
  }, []);
}
