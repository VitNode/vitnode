import { Bold } from 'lucide-react';
import { useState } from 'react';

import { ClearFormattingToolbarEditor } from './clear-formatting-toolbar-editor';

import { Toggle } from '../../ui/toggle';

export const ToolbarEditor = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="border-b-2 rounded-t-md p-2">
      <ClearFormattingToolbarEditor />
      <Toggle
        aria-label="Toggle bold"
        onClick={() => {
          setIsEnabled(prev => !prev);
        }}
        pressed={isEnabled}
      >
        <Bold />
      </Toggle>
    </div>
  );
};
