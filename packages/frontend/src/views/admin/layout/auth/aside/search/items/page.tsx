import { CommandItem, CommandShortcut } from '@/components/ui/command';
import { NavSearchAdminSessions } from '@/graphql/types';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';

interface Props
  extends Pick<
    NavSearchAdminSessions,
    'code' | 'code_plugin' | 'href' | 'parent_nav_code'
  > {
  setOpen: (open: boolean) => void;
}

export const PageItemContentSearchAsideAuthAdmin = ({
  code,
  code_plugin,
  parent_nav_code,
  href: hrefFromProps,
  setOpen,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const t = useTranslations(`admin_${code_plugin}`);
  const { push } = useRouter();
  const href = parent_nav_code
    ? `/admin/${code_plugin}/${parent_nav_code}/${hrefFromProps}`
    : `/admin/${code_plugin}/${hrefFromProps}`;

  return (
    <CommandItem
      onSelect={() => {
        push(href);
        setOpen(false);
      }}
    >
      <div>
        <span>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          {t(`nav.${parent_nav_code ? `${parent_nav_code}_` : ''}${code}`)}
        </span>
        {parent_nav_code && (
          <p className="text-muted-foreground">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            {t(`nav.${parent_nav_code}`)}
          </p>
        )}
      </div>
      <CommandShortcut>{t('nav.title')}</CommandShortcut>
    </CommandItem>
  );
};
