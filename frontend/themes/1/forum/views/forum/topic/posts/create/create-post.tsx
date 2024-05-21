"use client";

import { Suspense, lazy } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { EditorSkeleton } from "@/components/editor/editor";

const ContentCreatePost = lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentCreatePost
  }))
);

interface Props {
  className?: string;
}

export const CreatePost = ({ className }: Props) => {
  return (
    <Card className={className}>
      <CardContent className="sm:p-5 p-4">
        <Suspense fallback={<EditorSkeleton />}>
          <ContentCreatePost />
        </Suspense>
      </CardContent>
    </Card>
  );
};
