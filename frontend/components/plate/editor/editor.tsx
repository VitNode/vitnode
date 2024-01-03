'use client';

import { Plate, PlateContent, type Value } from '@udecode/plate-common';
import { useState } from 'react';
import { useLocale } from 'next-intl';

import { ToolbarEditor } from './toolbar/toolbar';
import { pluginsEditor } from './plugins/plugins';

export const Editor = () => {
  const locale = useLocale();
  const [values, setValues] = useState<
    {
      id_language: string;
      value: string;
    }[]
  >([]);
  const [selectedLanguage, setSelectedLanguage] = useState(locale);
  const currentState = values.find(value => value.id_language === selectedLanguage);

  return (
    <Plate
      key={selectedLanguage}
      value={currentState && JSON.parse(currentState.value)}
      onChange={(value: Value) => {
        if (!value) {
          setValues(prev => prev.filter(value => value.id_language !== selectedLanguage));
        }

        setValues(prev => [
          ...prev.filter(value => value.id_language !== selectedLanguage),
          {
            id_language: selectedLanguage,
            value: JSON.stringify(value)
          }
        ]);
      }}
      plugins={pluginsEditor}
    >
      <div className="rounded-md border border-input bg-background ring-offset-background">
        <ToolbarEditor
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />

        <PlateContent className="focus-visible:outline-none px-3 py-2" />
      </div>
    </Plate>
  );
};
