import { CalendarDaysIcon, SparklesIcon } from "lucide-react";
import { useFormatter, useTranslations } from "use-intl";

import type { UserImageKind } from "@/lib/user-images";

import { Avatar } from "@/components/avatar";
import { RoleFormatContent } from "@/components/role-format-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCoverImage } from "@/components/user-cover-image";

import type { UserImageEditor } from "./images/types";
import type { UserImageDialogLabels } from "./images/user-image-dialog";
import type { ProfileRole, UserProfile } from "./profile-query";

import { UserImageDialog } from "./images/user-image-dialog";

const coverStyle = (avatarColor: string): React.CSSProperties => {
  const color = `#${avatarColor}`;

  return {
    backgroundImage: `linear-gradient(135deg, ${color} 0%, color-mix(in oklab, ${color} 55%, transparent) 60%, color-mix(in oklab, ${color} 20%, transparent) 100%)`,
  };
};

const SecondaryRoles = ({ roles }: { roles: ProfileRole[] }) => {
  const t = useTranslations("core.profile");

  if (roles.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <dt className="text-muted-foreground text-sm">{t("secondaryRoles")}</dt>
      <dd>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {roles.map(role => (
            <li key={role.id}>
              <RoleFormatContent role={role} />
            </li>
          ))}
        </ul>
      </dd>
    </div>
  );
};

const useProfileImageLabels = ({
  canUpload,
  hasImage,
  kind,
}: {
  canUpload: boolean;
  hasImage: boolean;
  kind: UserImageKind;
}): UserImageDialogLabels => {
  const t = useTranslations("core.profile.images");
  const tKind = useTranslations(`core.profile.images.${kind}`);
  const tGlobal = useTranslations("core.global");

  return {
    cancel: tGlobal("cancel"),
    chooseAction: t("chooseAction"),
    confirmRemove: t("confirmRemove"),
    confirmUpload: t("confirmUpload"),
    desc: hasImage ? tKind("dialogDesc") : tKind("dialogDescEmpty"),
    remove: tKind("remove"),
    removeDesc: tKind("removeDesc"),
    title: tKind("edit"),
    upload: hasImage ? tKind("change") : tKind("upload"),
    ...(canUpload ? {} : { uploadDesc: tKind("notAllowed") }),
  };
};

const ProfileImageDialog = ({
  editor,
  hasImage,
  kind,
  size,
}: {
  editor: UserImageEditor;
  hasImage: boolean;
  kind: UserImageKind;
  size?: "icon" | "icon-sm";
}) => {
  const limit = editor.policy[kind];
  const labels = useProfileImageLabels({
    canUpload: limit.allowed,
    hasImage,
    kind,
  });

  return (
    <UserImageDialog
      canUpload={limit.allowed}
      hasImage={hasImage}
      kind={kind}
      labels={labels}
      maxBytes={limit.maxBytes}
      onRemove={async () => {
        await editor.onRemove(kind);
      }}
      onUpload={async file => {
        await editor.onUpload(kind, file);
      }}
      size={size}
    />
  );
};

export interface ProfileContentProps {
  /** Rendered beside the About card on large screens - a feed, posts, anything the host adds. */
  children?: React.ReactNode;
  editor?: UserImageEditor;
  user: UserProfile;
}

export const ProfileContent = ({
  children,
  editor,
  user,
}: ProfileContentProps) => {
  const t = useTranslations("core.profile");
  const format = useFormatter();
  const joinedAt = new Date(user.createdAt);
  const joinedLabel = format.dateTime(joinedAt, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const joinedIso = joinedAt.toISOString();

  return (
    <div className="container mx-auto flex flex-col gap-4 p-4 sm:gap-6">
      <Card className="gap-2 pt-0">
        <div
          className="bg-muted relative h-32 w-full sm:h-40 md:h-48"
          data-slot="profile-cover"
          style={coverStyle(user.avatarColor)}
        >
          <UserCoverImage fetchPriority="high" url={user.coverUrl} />

          {editor ? (
            <div className="absolute inset-e-3 top-3">
              <ProfileImageDialog
                editor={editor}
                hasImage={user.coverUrl !== null}
                kind="cover"
              />
            </div>
          ) : null}
        </div>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-end sm:gap-6 sm:text-start">
            <div className="relative -mt-16 shrink-0 sm:-mt-20">
              <Avatar
                className="border-card size-24 border-4 sm:size-32"
                loading="eager"
                size={128}
                user={user}
              />
              {editor ? (
                <div className="absolute inset-e-0 bottom-0">
                  <ProfileImageDialog
                    editor={editor}
                    hasImage={user.avatarUrl !== null}
                    kind="avatar"
                  />
                </div>
              ) : null}
            </div>

            <div className="flex max-w-full min-w-0 flex-col items-center gap-1 sm:items-start sm:pb-2">
              <div className="flex max-w-full min-w-0 flex-wrap items-baseline justify-center gap-x-4 sm:justify-start">
                <h1 className="text-foreground truncate text-2xl font-bold sm:text-3xl">
                  {user.name}
                </h1>
                <p className="text-muted-foreground truncate text-sm">
                  @{user.nameCode}
                </p>
              </div>
              <RoleFormatContent className="text-sm" role={user.role} />
            </div>
          </div>

          <p className="text-muted-foreground flex items-center justify-center gap-2 text-sm sm:justify-start">
            <CalendarDaysIcon aria-hidden="true" className="size-4 shrink-0" />
            <span>
              {t.rich("joined", {
                date: joinedLabel,
                time: chunks => <time dateTime={joinedIso}>{chunks}</time>,
              })}
            </span>
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <Card className="h-fit lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
                <SparklesIcon aria-hidden="true" className="size-5" />
              </span>
              {t("about")}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <dl className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <dt className="text-muted-foreground text-sm">
                  {t("memberSince")}
                </dt>
                <dd className="font-medium">
                  <time dateTime={joinedIso}>{joinedLabel}</time>
                </dd>
              </div>

              <SecondaryRoles roles={user.secondaryRoles} />
            </dl>
          </CardContent>
        </Card>

        {children ? (
          <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-2">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
};
