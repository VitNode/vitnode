'use client';

import { forwardRef } from 'react';

import { CONFIG } from '@/config';
import { generateLetterPhoto } from '@/functions/generate-letter-photo';
import { useSession } from '@/hooks/core/use-session';
import { Maybe, UploadCoreAttachmentsObj } from '@/graphql/hooks';
import { cx } from '@/functions/classnames';

import { Img } from '../../img/Img';

interface Props {
  sizeInRem: number;
  className?: string;
  user?: {
    avatar_color: string;
    id: string;
    name: string;
    avatar?: Maybe<UploadCoreAttachmentsObj>;
  };
}

const AvatarUser = forwardRef<HTMLDivElement, Props>(({ className, sizeInRem, user }, ref) => {
  const { session } = useSession();
  const current = {
    id: user?.id || session?.id,
    name: user?.name || session?.name,
    avatar: user?.avatar || session?.avatar,
    avatar_color: user?.avatar_color || session?.avatar_color
  };

  if (!current.id || !current.name || !current.avatar_color) return null;

  return (
    <Img
      className={cx('rounded-full flex-shrink-0', className)}
      imageClassName="object-cover"
      src={
        current.avatar
          ? `${CONFIG.graphql_url}/${current.avatar.url}`
          : generateLetterPhoto(current.name.slice(0, 1), current.avatar_color)
      }
      alt={current.name}
      ref={ref}
      width={sizeInRem * 16}
      height={sizeInRem * 16}
      priority={!current.avatar}
    />
  );
});
AvatarUser.displayName = 'AvatarUser';

export { AvatarUser };
