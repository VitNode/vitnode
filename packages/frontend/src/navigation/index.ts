import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { useRouter } from "./router";

const { redirect, usePathname, Link } = createSharedPathnamesNavigation();

export { Link, redirect, usePathname, useRouter };
