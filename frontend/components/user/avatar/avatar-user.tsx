'use client';

import { forwardRef } from 'react';

import { CONFIG } from '@/config';
import { generateLetterPhoto } from '@/functions/generate-letter-photo';
import { useSession } from '@/hooks/core/use-session';

import { Img } from '../../img/Img';

interface Props {
  sizeInRem: number;
}

const AvatarUser = forwardRef<HTMLDivElement, Props>(({ sizeInRem }, ref) => {
  const { session } = useSession();
  if (!session) return null;
  const { avatar, name } = session.authorization_core_sessions;

  return (
    <Img
      className="rounded-full"
      imageClassName="object-cover"
      src={
        avatar.img
          ? `${CONFIG.graphql_url}/${avatar.img.url}`
          : generateLetterPhoto(name.slice(0, 1), avatar.color)
      }
      alt={name}
      ref={ref}
      width={sizeInRem * 16}
      height={sizeInRem * 16}
      priority={!avatar.img}
    />
  );
});
AvatarUser.displayName = 'AvatarUser';

export { AvatarUser };
