import { AdminShellContent } from "@vitnode/core/tanstack/admin";
import { useAppNavigate } from "@vitnode/core/tanstack/auth";
import { LanguageSwitcher } from "@vitnode/core/tanstack/layout";

import { adminNav } from "@/lib/admin-nav";

export const AdminShell = ({ children }: { children: React.ReactNode }) => {
  const navigate = useAppNavigate();

  return (
    <AdminShellContent
      languageSwitcher={<LanguageSwitcher />}
      nav={adminNav}
      onNavigate={href => {
        void navigate(href);
      }}
    >
      {children}
    </AdminShellContent>
  );
};
