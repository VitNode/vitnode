'use client';

import { Editor } from '@/components/editor/editor';
import { Card, CardContent } from '@/components/ui/card';
import { TextLanguage } from '@/graphql/types';
import React from 'react';

export const Test = () => {
  const [value, setValue] = React.useState<TextLanguage[]>([]);

  return (
    <Card>
      <CardContent className="p-6">
        <Editor onChange={setValue} value={value} />
      </CardContent>
    </Card>
  );
};
