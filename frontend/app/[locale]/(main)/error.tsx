"use client";

import { InternalErrorView } from "@/plugins/core/admin/global/internal-error/internal-error-view";

export default function Error() {
  return (
    <div className="container">
      <InternalErrorView />
    </div>
  );
}
