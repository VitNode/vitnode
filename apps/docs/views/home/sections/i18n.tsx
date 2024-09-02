import { Languages } from 'lucide-react';
import img from '@/assets/home/languages.png';
import { Button } from '@/components/ui/button';
import { SectionFeatures } from '@/components/features/section';

export const I18nSectionFeatures = () => {
  return (
    <SectionFeatures
      img={img}
      icon={<Languages />}
      title="Internationalization (i18n)"
      desc="Reach a global audience with our comprehensive internationalization support."
      checklist={[
        {
          id: 1,
          text: 'Multi-language content management',
        },
        {
          id: 2,
          text: 'Manifest with i18n for SEO optimization',
        },
        {
          id: 3,
          text: 'Internationalized routing',
        },
        {
          id: 5,
          text: 'Inputs & WYSIWYG editor with i18n support',
        },
      ]}
    >
      <Button variant="ghost" className="!bg-card border">
        Test 123
      </Button>
    </SectionFeatures>
  );
};
