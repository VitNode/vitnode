import { ListNavAdmin } from './list/list-nav-admin';

export const NavAdmin = () => {
  return (
    <nav className="fixed top-0 left-0 h-screen bg-card w-60 shadow overflow-y-auto z-10 hidden sm:block">
      <div className="p-4 flex items-center justify-center h-16 sticky top-0 bg-card">VitNode</div>
      <ListNavAdmin />
    </nav>
  );
};
