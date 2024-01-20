import { forwardRef, type CSSProperties, type ReactNode, useCallback } from 'react';
import { Virtuoso, type Components } from 'react-virtuoso';

const List: Components['List'] = forwardRef(
  ({ children, style }: { children?: ReactNode; style?: CSSProperties }, ref) => {
    return (
      <div className="rounded-md border" style={style} ref={ref}>
        {children}
      </div>
    );
  }
);

List.displayName = 'List';

export const ContentTablePluginsAdmin = () => {
  const TableRow = useCallback(
    ({ ...props }) => (
      <div
        className="[&:not(:last-child)]:border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted px-4 py-2"
        {...props}
      />
    ),
    []
  );

  return (
    <Virtuoso
      useWindowScroll
      overscan={200}
      totalCount={100}
      components={{
        List,
        Item: TableRow
      }}
      itemContent={index => (
        <>
          <div className="flex flex-col">
            <span>Forum {index}</span>
            <span className="text-muted-foreground text-sm">Description</span>
            <span className="text-muted-foreground text-sm">Author</span>
          </div>
        </>
      )}
    />
  );
};
