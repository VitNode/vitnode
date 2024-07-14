import {
  ModeratorsStaffAdminView,
  ModeratorsStaffAdminViewProps,
  generateMetadataModeratorsStaffAdminView,
} from 'vitnode-frontend/admin/members/staff/moderators/moderators-view';

export const generateMetadata = generateMetadataModeratorsStaffAdminView;

export default function Page(props: ModeratorsStaffAdminViewProps) {
  return <ModeratorsStaffAdminView {...props} />;
}
