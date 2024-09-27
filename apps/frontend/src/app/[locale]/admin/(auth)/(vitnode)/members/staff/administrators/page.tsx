import {
  AdministratorsStaffAdminView,
  generateMetadataAdministratorsStaffAdmin,
} from 'vitnode-frontend/views/admin/views/members/staff/administrators/administrators-view';

export const generateMetadata = generateMetadataAdministratorsStaffAdmin;

export default function Page(
  props: React.ComponentProps<typeof AdministratorsStaffAdminView>,
) {
  return <AdministratorsStaffAdminView {...props} />;
}
