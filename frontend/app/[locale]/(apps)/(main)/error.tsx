"use client";

import { InternalErrorView } from "@/admin/core/global/internal-error-view";

export default function Error() {
  return (
    <div className="container">
      <InternalErrorView />
    </div>
  );
}
