import { ToolbarRoot } from '@/components/ui/toolbar';
import { BasicToolbarEditor } from './basic/basic';

export const ToolbarEditor = () => {
  return (
    <ToolbarRoot className="sticky left-0 top-[57px] z-50 w-full overflow-x-auto rounded-t-lg border-b border-b-border bg-background/95 backdrop-blur flex items-center">
      <BasicToolbarEditor />
    </ToolbarRoot>
  );
};
