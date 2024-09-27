import {
  generateMetadataModeratorsStaffAdmin,
  ModeratorsStaffAdminView,
} from 'vitnode-frontend/views/admin/views/members/staff/moderators/moderators-view';

export const generateMetadata = generateMetadataModeratorsStaffAdmin;

export default function Page(
  props: React.ComponentProps<typeof ModeratorsStaffAdminView>,
) {
  return <ModeratorsStaffAdminView {...props} />;
}
