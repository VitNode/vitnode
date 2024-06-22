import * as React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import "./global.css";

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin");

  return {
    title: t("title"),
    robots: "noindex, nofollow",
  };
}

export default async function Layout({ children }: Props) {
  return children;
}
