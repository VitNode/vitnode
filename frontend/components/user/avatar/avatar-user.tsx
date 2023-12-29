import { forwardRef } from 'react';

import { CONFIG } from '@/config';
import { generateLetterPhoto } from '@/functions/generate-letter-photo';
import type { Maybe, UploadCoreAttachmentsObj } from '@/graphql/hooks';
import { cx } from '@/functions/classnames';

import { Img } from '../../img/imgs';

interface Props {
  sizeInRem: number;
  user: {
    avatar_color: string;
    id: string;
    name: string;
    avatar?: Maybe<UploadCoreAttachmentsObj>;
  };
  className?: string;
}

const AvatarUser = forwardRef<HTMLImageElement, Props>(
  ({ className, sizeInRem, user: { avatar, avatar_color, name } }, ref) => {
    return (
      <Img
        className={cx('rounded-full flex-shrink-0', className)}
        imageClassName="object-cover"
        src={
          avatar
            ? `${CONFIG.graphql_url}/${avatar.url}`
            : generateLetterPhoto(name.slice(0, 1), avatar_color)
        }
        alt={name}
        ref={ref}
        width={sizeInRem * 16}
        height={sizeInRem * 16}
        priority={!avatar}
      />
    );
  }
);
AvatarUser.displayName = 'AvatarUser';

export { AvatarUser };
