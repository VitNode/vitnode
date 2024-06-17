import { ErrorViewSSR } from "@/components/views/error-view-ssr";

export default function NotFoundPage() {
  return (
    <div className="container">
      <ErrorViewSSR code="404" />
    </div>
  );
}
