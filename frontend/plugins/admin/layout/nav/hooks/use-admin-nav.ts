import * as React from "react";

interface Args {
  setActiveItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AdminNavContext = React.createContext<Args>({
  setActiveItems: () => {}
});

export const useAdminNav = () => React.useContext(AdminNavContext);
