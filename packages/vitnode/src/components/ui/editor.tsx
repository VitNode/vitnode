"use client";

import React from "react";

import type { TipTapEditorProps } from "@/components/tiptap/tiptap-editor";

import { Loader } from "./loader";

const TipTapEditor = React.lazy(async () =>
  import("@/components/tiptap/tiptap-editor").then(module => ({
    default: module.TipTapEditor,
  })),
);

const subscribeNever = () => () => {};
const getIsHydrated = () => true;
const getIsHydratedOnServer = () => false;

export const Editor = (props: TipTapEditorProps) => {
  const isHydrated = React.useSyncExternalStore(
    subscribeNever,
    getIsHydrated,
    getIsHydratedOnServer,
  );

  if (!isHydrated) return <Loader />;

  return (
    <React.Suspense fallback={<Loader />}>
      <TipTapEditor {...props} />
    </React.Suspense>
  );
};
