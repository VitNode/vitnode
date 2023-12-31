import { ToolbarRoot, ToolbarSeparator } from '@/components/ui/toolbar';
import { BasicMarksToolbarEditor } from './basic-marks';
import { MoreToolbarEditor } from './more';
import { BasicElementsToolbarEditor } from './basic-elements';

export const ToolbarEditor = () => {
  return (
    <ToolbarRoot className="sticky left-0 top-[57px] z-50 w-full overflow-x-auto rounded-t-lg border-b border-b-border bg-background/95 backdrop-blur p-1 flex items-center gap-1 flex-wrap">
      <BasicMarksToolbarEditor />
      <MoreToolbarEditor />
      <ToolbarSeparator />
      <BasicElementsToolbarEditor />
    </ToolbarRoot>
  );
};
