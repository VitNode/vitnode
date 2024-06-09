import * as React from "react";
import { Button, Html } from "@react-email/components";

import { getTranslationForEmail } from "./get-translation-for-email";

export default function Email() {
  const t = getTranslationForEmail("admin");

  return (
    <Html lang="en">
      <Button>XDDD - {t("title")}</Button>
    </Html>
  );
}
