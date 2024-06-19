"use client";

import { InternalErrorView } from "@/plugins/admin/global/internal-error/internal-error-view";

export default function Error() {
  return (
    <div className="container">
      <InternalErrorView />
    </div>
  );
}
