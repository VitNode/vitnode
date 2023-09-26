import { ListNavAdmin } from './list/list-nav-admin';

export const NavAdmin = () => {
  return (
    <nav className="fixed top-0 left-0 h-screen bg-card w-16 border-r">
      <div className="p-4 flex items-center justify-center">Logo</div>
      <ListNavAdmin />
    </nav>
  );
};
