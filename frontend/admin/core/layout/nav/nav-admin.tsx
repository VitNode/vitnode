import { Link } from "@/i18n";
import { ListNavAdmin } from "./list/list-nav-admin";
import { LogoVitNode } from "@/components/logo-vitnode";

export const NavAdmin = () => {
  return (
    <nav className="fixed top-0 left-0 h-screen w-60 overflow-y-auto z-10 hidden sm:block overflow-auto">
      <div className="sticky top-0 bg-background/75 backdrop-blur flex items-center justify-center h-16 z-40">
        <Link href="/admin/core/dashboard">
          <LogoVitNode className="h-10" />
        </Link>
      </div>

      <div className="p-3 pb-6">
        <ListNavAdmin />
      </div>
    </nav>
  );
};
