import { AiAdminLayout } from 'vitnode-frontend/views/admin/views/core/ai/layout';

export default function Layout(
  props: React.ComponentProps<typeof AiAdminLayout>,
) {
  return <AiAdminLayout {...props} />;
}
