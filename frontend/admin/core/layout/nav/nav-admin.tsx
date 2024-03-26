import { Link } from "@/i18n";
import { ListNavAdmin } from "./list/list-nav-admin";
import { LogoVitNode } from "@/components/logo-vitnode";

export const NavAdmin = () => {
  return (
    <nav className="fixed top-0 left-0 h-screen w-64 overflow-y-auto z-10 hidden bg-card/75 backdrop-blur sm:block overflow-auto border-r">
      <div className="sticky top-0 bg-card/75 border-b backdrop-blur flex items-center justify-center h-16 z-40">
        <Link href="/admin/core/dashboard">
          <LogoVitNode className="h-10" />
        </Link>
      </div>

      <div className="p-5">
        <ListNavAdmin />
      </div>
    </nav>
  );
};
