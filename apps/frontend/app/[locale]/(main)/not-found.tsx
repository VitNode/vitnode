import { ErrorView } from '@/plugins/core/templates/views/global/error/error-view';

export default function NotFoundPage() {
  return (
    <div className="container">
      <ErrorView code="404" />
    </div>
  );
}
