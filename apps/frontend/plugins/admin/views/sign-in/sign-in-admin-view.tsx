import { Card, LogoVitNode } from "vitnode-frontend/components";

import { FormSignInAdmin } from "./form/form-sign-in-admin";
import { PoweredByVitNode } from "@/plugins/admin/global/powered-by";

export const SignInAdminView = () => {
  return (
    <div className="mx-auto my-10 flex max-w-lg flex-col gap-10 py-10">
      <header className="flex justify-center">
        <LogoVitNode className="h-16" />
      </header>

      <Card>
        <FormSignInAdmin />
      </Card>

      <footer className="text-center text-sm">
        <PoweredByVitNode className="text-muted-foreground no-underline" />
      </footer>
    </div>
  );
};
