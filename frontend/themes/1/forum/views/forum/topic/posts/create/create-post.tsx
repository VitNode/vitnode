"use client";

import { Suspense, lazy } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "@/hooks/core/use-session";
import { Skeleton } from "@/components/ui/skeleton";

const ContentCreatePost = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentCreatePost
  }))
);

interface Props {
  className?: string;
}

export const CreatePost = ({ className }: Props) => {
  const { session } = useSession();
  if (!session) return null;

  return (
    <Card className={className}>
      <CardContent className="sm:p-5 p-4">
        <Suspense fallback={<Skeleton className="w-full h-[54px]" />}>
          <ContentCreatePost />
        </Suspense>
      </CardContent>
    </Card>
  );
};
