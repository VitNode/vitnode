import { ShieldCheck } from 'lucide-react';
import img from '@/assets/image.png';
import { SectionFeatures } from '@/components/features/section';
import { Button } from '@/components/ui/button';

export const SecureSectionFeatures = () => {
  return (
    <SectionFeatures
      img={img}
      icon={<ShieldCheck />}
      title="Secure"
      desc="Protect your app from malicious attacks and keep your users safe."
      checklist={[
        {
          id: 1,
          text: 'Captcha protection by Google reCAPTCHA or Cloudflare Turnstile',
        },
        {
          id: 2,
          text: 'Protected by Helmet and CORS',
        },
        {
          id: 3,
          text: 'Throttling by NestJS Throttler',
        },
      ]}
      reverse
    >
      <Button variant="ghost" className="!bg-card border">
        Test 123
      </Button>
    </SectionFeatures>
  );
};
