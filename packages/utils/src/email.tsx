import * as React from "react";
import { Html, Button } from "@react-email/components";

interface Props {
  url: string;
}

export function Email({ url }: Props) {
  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
}
