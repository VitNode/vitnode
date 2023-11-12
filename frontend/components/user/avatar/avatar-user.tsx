'use client';

import { forwardRef } from 'react';

import { CONFIG } from '@/config';
import { generateLetterPhoto } from '@/functions/generate-letter-photo';
import { useSession } from '@/hooks/core/use-session';
import { Maybe, UploadCoreAttachmentsObj } from '@/graphql/hooks';

import { Img } from '../../img/Img';

interface Props {
  sizeInRem: number;
  user?: {
    avatar_color: string;
    name: string;
    name_seo: string;
    avatar?: Maybe<UploadCoreAttachmentsObj>;
  };
}

const AvatarUser = forwardRef<HTMLDivElement, Props>(({ sizeInRem, user }, ref) => {
  const { session } = useSession();
  const current = {
    name_seo: user?.name_seo || session?.name_seo,
    name: user?.name || session?.name,
    avatar: user?.avatar || session?.avatar,
    avatar_color: user?.avatar_color || session?.avatar_color
  };

  if (!current.avatar || !current.name_seo || !current.name || !current.avatar_color) return null;

  return (
    <Img
      className="rounded-full"
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
