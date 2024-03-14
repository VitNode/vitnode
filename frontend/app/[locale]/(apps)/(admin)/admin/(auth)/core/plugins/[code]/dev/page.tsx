import { notFound } from "next/navigation";

import { CONFIG } from "@/config";

export default async function Page() {
  if (!CONFIG.node_development) notFound();

  return <div>Plugin</div>;
}
