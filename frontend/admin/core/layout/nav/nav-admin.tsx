import { ListNavAdmin } from "./list/list-nav-admin";

export const NavAdmin = () => {
  return (
    <nav className="fixed top-16 left-0 h-screen w-64 overflow-y-auto z-10 hidden bg-card/75 backdrop-blur sm:block overflow-auto border-r">
      <div className="p-4">
        <ListNavAdmin />
      </div>
    </nav>
  );
};
