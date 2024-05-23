import { forwardRef } from "react";

import { CONFIG } from "@/config";
import { generateLetterPhoto } from "@/functions/generate-letter-photo";
import type { Maybe, AvatarUser as AvatarUserType } from "@/graphql/hooks";
import { cn } from "@/functions/classnames";

import { Img } from "../../img";

interface Props {
  sizeInRem: number;
  user: {
    avatar_color: string;
    name: string;
    name_seo: string;
    avatar?: Maybe<Pick<AvatarUserType, "dir_folder" | "file_name">>;
  };
  className?: string;
}

const AvatarUser = forwardRef<HTMLImageElement, Props>(
  ({ className, sizeInRem, user: { avatar, avatar_color, name } }, ref) => {
    return (
      <Img
        className={cn("rounded-full flex-shrink-0", className)}
        imageClassName="object-cover"
        src={
          avatar
            ? `${CONFIG.graphql_public_url}/${avatar.dir_folder}/${avatar.file_name}`
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
AvatarUser.displayName = "AvatarUser";

export { AvatarUser };
