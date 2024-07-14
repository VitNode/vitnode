import {
  UsersMembersAdminView,
  UsersMembersAdminViewProps,
  generateMetadataUsersMembersAdminView,
} from 'vitnode-frontend/admin/members/users/users-members-admin-view';

export const generateMetadata = generateMetadataUsersMembersAdminView;

export default function Page(props: UsersMembersAdminViewProps) {
  return <UsersMembersAdminView {...props} />;
}
