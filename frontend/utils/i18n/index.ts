import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { Link } from "./link";
import { useRouter } from "./router";

const { redirect, usePathname } = createSharedPathnamesNavigation();

export { Link, redirect, usePathname, useRouter };
