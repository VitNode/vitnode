import {
  GroupsMembersAdminView,
  GroupsMembersAdminViewProps,
  generateMetadataGroupsMembersAdminView,
} from 'vitnode-frontend/admin/members/groups/groups-members-admin-view';

export const generateMetadata = generateMetadataGroupsMembersAdminView;

export default function Page(props: GroupsMembersAdminViewProps) {
  return <GroupsMembersAdminView {...props} />;
}
