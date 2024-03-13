"use client";

import { LanguageSwitcher } from "@/components/switchers/language-switcher";
import { CONFIG } from "@/config";

import { useSessionAdmin } from "../../hooks/use-session-admin";

export const LangSwitcherHeaderAdmin = () => {
  const { rebuild_required } = useSessionAdmin();

  if (rebuild_required.langs && !CONFIG.node_development) {
    return null;
  }

  return <LanguageSwitcher />;
};
