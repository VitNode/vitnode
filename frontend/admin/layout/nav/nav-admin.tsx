import { ListNavAdmin } from './list/list-nav-admin';

export const NavAdmin = () => {
  return (
    <nav className="fixed left-0 h-screen w-60 overflow-y-auto z-10 hidden sm:block top-16">
      <ListNavAdmin className="p-4" />
    </nav>
  );
};
