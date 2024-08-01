import { Plug } from 'lucide-react';
import img from '@/assets/home/plugins.png';
import { SectionFeatures } from '@/components/features/section';
import { Button } from '@/components/ui/button';

export const PluginsSectionFeatures = () => {
  return (
    <SectionFeatures
      img={img}
      icon={<Plug />}
      title="Plugins System"
      desc="Enhance your app with powerful plugins extend the functionality of
          your app."
      checklist={[
        {
          id: 1,
          text: 'Easy import & export tgz file from AdminCP',
        },
        {
          id: 2,
          text: 'Own settings, permissions, databases, etc.',
        },
        {
          id: 3,
          text: 'Version control',
        },
      ]}
    >
      <Button variant="ghost" className="!bg-card border">
        Test 123
      </Button>
    </SectionFeatures>
  );
};
