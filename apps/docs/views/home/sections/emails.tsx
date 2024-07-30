import { AtSign } from 'lucide-react';
import img from '@/assets/image.png';
import { SectionFeatures } from '@/components/features/section';
import { Button } from '@/components/ui/button';

export const EmailsSectionFeatures = () => {
  return (
    <SectionFeatures
      img={img}
      icon={<AtSign />}
      title="Integrated Email System"
      desc="Manage your emails with ease, send emails to your users, and more."
      checklist={[
        {
          id: 1,
          text: 'Customizable email templates using React',
        },
        {
          id: 2,
          text: 'Send emails using SMTP',
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
