import { getSessionData } from "@/functions/get-session-data";
import { ErrorViewSSR } from "@/components/views/error-view-ssr";

export default async function NotFoundPage() {
  const { theme_id } = await getSessionData();

  return (
    <div className="container">
      <ErrorViewSSR theme_id={theme_id} code="404" />
    </div>
  );
}
