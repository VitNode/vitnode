import {
  CaptchaSecurityAdminView,
  generateMetadataCaptchaSecurityAdmin,
} from 'vitnode-frontend/views/admin/views/core/settings/security/captcha/captcha-security-admin-view';

export const generateMetadata = generateMetadataCaptchaSecurityAdmin;

export default function Page() {
  return <CaptchaSecurityAdminView />;
}
