import { ErrorViewSSR } from "@/components/views/error-view-ssr";
import { getSessionData } from "@/graphql/get-session-data";

export default async function NotFoundPage() {
  const { theme_id } = await getSessionData();

  return (
    <div className="container">
      <ErrorViewSSR theme_id={theme_id} code="404" />
    </div>
  );
}
