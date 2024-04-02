import { ListNavAdmin } from "./list/list-nav-admin";

export const NavAdmin = () => {
  return (
    <nav className="fixed top-16 left-0 h-screen w-64 overflow-y-auto z-10 hidden sm:block overflow-auto p-4">
      <ListNavAdmin />
    </nav>
  );
};
