import { Folder, MessagesSquare } from 'lucide-react';

import { Link } from '@/i18n';
import { buttonVariants } from '@/components/ui/button';
import { TextLanguage } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { ReadOnlyEditor } from '@/components/editor/read-only/read-only-editor';

export interface ItemForumProps {
  description: TextLanguage[];
  id: string;
  name: TextLanguage[];
  name_seo: string;
  children?: Omit<ItemForumProps, 'description'>[] | null;
}

export const ItemForum = ({ children, description, id, name, name_seo }: ItemForumProps) => {
  const { convertText } = useTextLang();

  return (
    <div className="px-6 py-4 [&:not(:last-child)]:border-b hover:bg-muted/50 flex gap-4 cursor-pointer flex-col md:flex-row">
      <div className="flex gap-4 flex-1">
        <div className="bg-primary/20 w-10 h-10 rounded-md flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 text-primary flex-shrink-0">
          <MessagesSquare />
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-medium">
            <Link href={`/forum/${name_seo}`} className="text-foreground no-underline">
              {convertText(name)}
            </Link>
          </h3>
          <p className="text-muted-foreground text-sm [&_p]:m-0">
            <ReadOnlyEditor id={`${id}_description`} value={description} />
          </p>

          {children && children.length > 0 && (
            <div className="flex mt-2 flex-wrap">
              {children.map(child => (
                <Link
                  key={child.id}
                  href={`/forum/${child.name_seo}`}
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                    className: 'h-auto min-h-[2.25rem] font-normal'
                  })}
                >
                  <Folder />
                  <span>{convertText(child.name)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
