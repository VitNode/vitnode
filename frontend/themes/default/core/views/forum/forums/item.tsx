import { Folder, MessagesSquare } from 'lucide-react';

import { Link } from '@/i18n';
import { buttonVariants } from '@/components/ui/button';

export const ItemForum = () => {
  return (
    <div className="px-6 py-4 [&:not(:last-child)]:border-b hover:bg-muted/50 flex gap-4 cursor-pointer flex-col md:flex-row">
      <div className="flex gap-4 flex-1">
        <div className="bg-primary/20 w-10 h-10 rounded-md flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 text-primary flex-shrink-0">
          <MessagesSquare />
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-medium">
            <Link href="/forum/test" className="text-foreground no-underline">
              Test 123
            </Link>
          </h3>
          <p className="text-muted-foreground text-sm">Description test 123</p>

          <div className="flex mt-2 flex-wrap">
            <Link
              href="/forum/test"
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
                className: 'h-auto min-h-[2.25rem] font-normal'
              })}
            >
              <Folder />
              <span>Test123 :D</span>
            </Link>

            <Link
              href="/forum/test"
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
                className: 'h-auto min-h-[2.25rem] font-normal'
              })}
            >
              <Folder />
              <span>Test123 :D</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
