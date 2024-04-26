import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const { redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation();
