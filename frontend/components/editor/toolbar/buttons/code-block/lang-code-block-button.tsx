import {
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName
} from '@lexical/code';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey, $getSelection, $isRangeSelection, $isRootOrShadowRoot } from 'lexical';
import type { NodeKey } from 'lexical';
import { $findMatchingParent } from '@lexical/utils';

import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

import { useUpdateStateEditor } from '../../hooks/use-update-state-editor';

interface CodeLanguageType {
  friendlyName: string;
  lang: string;
}

const getCodeLanguageOptions = (): CodeLanguageType[] => {
  const options: CodeLanguageType[] = [];

  for (const [lang, friendlyName] of Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP)) {
    options.push({ lang, friendlyName });
  }

  return options;
};

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

export const LangCodeBlockButtonEditor = () => {
  const t = useTranslations('core.editor');
  const [codeLanguage, setCodeLanguage] = useState('');
  const [editor] = useLexicalComposerContext();
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);

  useUpdateStateEditor({
    handleChange: () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, e => {
              const parent = e.getParent();

              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      setSelectedElementKey(elementKey);
      if (elementDOM === null || !$isCodeNode(element)) return;

      const language = element.getLanguage();
      setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : '');
    }
  });

  return (
    <Select
      value={codeLanguage}
      onValueChange={val => {
        editor.update(() => {
          if (selectedElementKey === null) return;

          const node = $getNodeByKey(selectedElementKey);
          if (!$isCodeNode(node)) return;
          node.setLanguage(val);
        });
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SelectTrigger
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-auto border-0'
              })}
            >
              {getLanguageFriendlyName(codeLanguage)}
            </SelectTrigger>
          </TooltipTrigger>

          <TooltipContent side="bottom">{t('code_language')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SelectContent onCloseAutoFocus={() => editor.focus()}>
        {CODE_LANGUAGE_OPTIONS.map(item => (
          <SelectItem key={item.lang} value={item.lang}>
            {item.friendlyName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
