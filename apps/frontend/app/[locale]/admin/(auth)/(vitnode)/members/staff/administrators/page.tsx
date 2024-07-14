import {
  AdministratorsStaffAdminView,
  AdministratorsStaffAdminViewProps,
  generateMetadataAdministratorsStaffAdminView,
} from 'vitnode-frontend/admin/members/staff/administrators/administrators-view';

export const generateMetadata = generateMetadataAdministratorsStaffAdminView;

export default function Page(props: AdministratorsStaffAdminViewProps) {
  return <AdministratorsStaffAdminView {...props} />;
}
