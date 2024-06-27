import { ErrorView } from 'vitnode-frontend/theme-tsx/error/error-view';

export default function NotFoundPage() {
  return (
    <div className="container">
      <ErrorView code="404" />
    </div>
  );
}
