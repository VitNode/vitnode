'use client';

import { forwardRef } from 'react';

import { CONFIG } from '@/config';
import { generateLetterPhoto } from '@/functions/generate-letter-photo';
import { useSession } from '@/hooks/core/use-session';
import { AvatarObj } from '@/graphql/hooks';

import { Img } from '../../img/Img';

interface Props {
  sizeInRem: number;
  user?: {
    avatar: AvatarObj;
    id: string;
    name: string;
  };
}

const AvatarUser = forwardRef<HTMLDivElement, Props>(({ sizeInRem, user }, ref) => {
  const { session } = useSession();
  const current = {
    id: user?.id || session?.id,
    name: user?.name || session?.name,
    avatar: user?.avatar || session?.avatar
  };

  if (!current.avatar || !current.id || !current.name) return null;

  return (
    <Img
      className="rounded-full"
      imageClassName="object-cover"
      src={
        current.avatar.img
          ? `${CONFIG.graphql_url}/${current.avatar.img.url}`
          : generateLetterPhoto(current.name.slice(0, 1), current.avatar.color)
      }
      alt={current.name}
      ref={ref}
      width={sizeInRem * 16}
      height={sizeInRem * 16}
      priority={!current.avatar.img}
    />
  );
});
AvatarUser.displayName = 'AvatarUser';

export { AvatarUser };
