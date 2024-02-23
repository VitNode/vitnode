"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Suspense, lazy } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader } from "@/components/loader";
import { getIdFormString } from "@/functions/url";
import type { PermissionsForumForumsCount } from "@/graphql/hooks";

const CreateTopic = lazy(() =>
  import("../../../actions/create-topic").then(module => ({
    default: module.CreateTopic
  }))
);

interface Props {
  permissions: Pick<PermissionsForumForumsCount, "can_create">;
}

export const ActionsForumsForum = ({ permissions }: Props) => {
  const t = useTranslations("forum.topics.create");
  const { id } = useParams();

  if (!permissions.can_create) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t("title")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl">
        <Suspense fallback={<Loader />}>
          <CreateTopic defaultForumId={getIdFormString(id)} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
