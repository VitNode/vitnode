import { ReactNode } from 'react';

import { Card } from '@/components/ui/card';
import { Link } from '@/i18n';

interface Props {
  children: ReactNode;
}

export const ConfigLayout = ({ children }: Props) => {
  return (
    <div className="max-w-[50rem] mx-auto my-10 py-10">
      <div className="flex items-center justify-center mb-5">VitNode</div>
      <Card>{children}</Card>
      <div className="text-center mt-5 text-muted-foreground">
        <span>Powered by </span>
        <Link href="https://vitnode.com/" target="_blank" rel="noopener noreferrer">
          VitNode
        </Link>
      </div>
    </div>
  );
};
