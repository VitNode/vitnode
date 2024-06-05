"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { EditorSkeleton } from "@/components/editor/editor";

const ContentCreatePost = React.lazy(async () =>
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
      <CardContent className="p-4 sm:p-5">
        <React.Suspense fallback={<EditorSkeleton />}>
          <ContentCreatePost />
        </React.Suspense>
      </CardContent>
    </Card>
  );
};
