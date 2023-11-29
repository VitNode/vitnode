import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { $isCodeNode, CodeNode, getLanguageFriendlyName, normalizeCodeLang } from '@lexical/code';
import { $getNearestNodeFromDOMNode } from 'lexical';

import { useDebounce } from '@/hooks/core/use-debounce';
import { getMouseInfo } from './utils-code-action-menu-plugin-editor';
import {
  PrettierButtonCodeAction,
  PrettierFormatError,
  canBePrettier
} from './prettier/prettier-button-code-action';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { Loader } from '@/components/loader/loader';
import { CopyButtonCodeAction } from './copy/copy-button-code-action';

const PrettierAlertDialog = lazy(() =>
  import('./prettier/prettier-alert-dialog').then(module => ({
    default: module.PrettierAlertDialog
  }))
);

interface Position {
  right: string;
  top: string;
}

interface Props {
  anchorElem: HTMLElement;
}

const CODE_PADDING = 8;

export const ContainerCodeActionMenuPluginEditor = ({ anchorElem }: Props) => {
  const [editor] = useLexicalComposerContext();
  const [isShown, setShown] = useState(false);
  const [lang, setLang] = useState('');
  const [position, setPosition] = useState<Position>({
    right: '0',
    top: '0'
  });
  const codeSetRef = useRef<Set<string>>(new Set());
  const [shouldListenMouseMove, setShouldListenMouseMove] = useState(false);
  const codeDOMNodeRef = useRef<HTMLElement | null>(null);
  const [prettierError, setPrettierError] = useState<PrettierFormatError | null>(null);

  const debouncedOnMouseMove = useDebounce(
    (event: MouseEvent) => {
      const { codeDOMNode, isOutside } = getMouseInfo(event);
      if (isOutside) {
        setShown(false);

        return;
      }

      if (!codeDOMNode) {
        return;
      }

      codeDOMNodeRef.current = codeDOMNode;

      let codeNode: CodeNode | null = null;
      let _lang = '';

      editor.update(() => {
        const maybeCodeNode = $getNearestNodeFromDOMNode(codeDOMNode);

        if ($isCodeNode(maybeCodeNode)) {
          codeNode = maybeCodeNode;
          _lang = codeNode.getLanguage() || '';
        }
      });

      if (codeNode) {
        const { right: editorElemRight, y: editorElemY } = anchorElem.getBoundingClientRect();
        const { right, y } = codeDOMNode.getBoundingClientRect();
        setLang(_lang);
        setShown(true);
        setPosition({
          right: `${editorElemRight - right + CODE_PADDING}px`,
          top: `${y - editorElemY}px`
        });
      }
    },
    50,
    1000
  );

  useEffect(() => {
    if (!shouldListenMouseMove) {
      return;
    }

    document.addEventListener('mousemove', debouncedOnMouseMove);

    return () => {
      setShown(false);
      debouncedOnMouseMove.cancel();
      document.removeEventListener('mousemove', debouncedOnMouseMove);
    };
  }, [shouldListenMouseMove, debouncedOnMouseMove]);

  editor.registerMutationListener(CodeNode, mutations => {
    editor.getEditorState().read(() => {
      for (const [key, type] of mutations) {
        switch (type) {
          case 'created':
            codeSetRef.current.add(key);
            setShouldListenMouseMove(codeSetRef.current.size > 0);
            break;

          case 'updated':
            if (codeSetRef.current.has(key)) {
              break;
            }

            codeSetRef.current.add(key);
            setShouldListenMouseMove(codeSetRef.current.size > 0);
            break;

          case 'destroyed':
            codeSetRef.current.delete(key);
            setShouldListenMouseMove(codeSetRef.current.size > 0);
            break;

          default:
            break;
        }
      }
    });
  });

  return (
    <AlertDialog>
      {isShown && (
        <div
          className="vitnode-editor_code--menu absolute p-2 flex items-center gap-2"
          style={{ ...position }}
        >
          <span className="text-sm text-muted-foreground pointer-events-none">
            {getLanguageFriendlyName(lang)}
          </span>
          {codeDOMNodeRef.current && (
            <>
              {canBePrettier(normalizeCodeLang(lang)) && (
                <PrettierButtonCodeAction
                  codeDOMNode={codeDOMNodeRef.current}
                  lang={normalizeCodeLang(lang)}
                  setPrettierError={setPrettierError}
                />
              )}
              <CopyButtonCodeAction codeDOMNode={codeDOMNodeRef.current} />
            </>
          )}
        </div>
      )}

      <AlertDialogContent className="select-auto">
        <Suspense fallback={<Loader />}>
          <PrettierAlertDialog prettierError={prettierError} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
