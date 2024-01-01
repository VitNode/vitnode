'use client';

import { Plate, PlateContent } from '@udecode/plate-common';

import { ToolbarEditor } from './toolbar/toolbar';
import { pluginsEditor } from './plugins/plugins';

export const Editor = () => {
  return (
    <Plate plugins={pluginsEditor}>
      <div className="rounded-md border border-input bg-background ring-offset-background">
        <ToolbarEditor />

        <PlateContent className="focus-visible:outline-none px-3 py-2" />
      </div>
    </Plate>
  );
};
