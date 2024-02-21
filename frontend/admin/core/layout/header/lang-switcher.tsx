"use client";

import { LanguageSwitcher } from "@/components/switchers/language-switcher";

import { useSessionAdmin } from "../../hooks/use-session-admin";

export const LangSwitcherHeaderAdmin = () => {
  const { rebuild_required } = useSessionAdmin();

  if (rebuild_required.langs && process.env.NODE_ENV !== "development") {
    return null;
  }

  return <LanguageSwitcher />;
};
