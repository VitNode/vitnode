import { Card } from "@/components/ui/card";
import { FormSignInAdmin } from "./form/form-sign-in-admin";
import { LogoVitNode } from "@/components/logo-vitnode";
import { PoweredByVitNode } from "@/plugins/admin/global/powered-by";

export const SignInAdminView = () => {
  return (
    <div className="max-w-[32rem] mx-auto my-10 py-10 flex flex-col gap-10">
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
