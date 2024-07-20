import Image, { type StaticImageData } from 'next/image';
import { IconFeatures } from './icon';
import { ChecklistFeatures, type ChecklistFeaturesProps } from './checklist';
import { cn } from '@/utils/classnames';

interface Props {
  icon: React.ReactNode;
  title: string;
  desc: string;
  checklist: ChecklistFeaturesProps['list'];
  children?: React.ReactNode;
  img: StaticImageData;
  reverse?: boolean;
}

export const SectionFeatures = ({
  icon,
  title,
  desc,
  checklist,
  children,
  img,
  reverse,
}: Props) => {
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 lg:items-center xl:gap-x-20">
      <Image
        src={img}
        className={cn('rounded-md', {
          'order-1 lg:order-2': reverse,
        })}
        alt="test"
      />

      <div className={cn({ 'order-2 lg:order-1': reverse })}>
        <IconFeatures>{icon}</IconFeatures>

        <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{title}</h3>
        <p className="text-muted-foreground mt-2 text-base font-normal lg:text-lg">
          {desc}
        </p>

        <ChecklistFeatures list={checklist} />

        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
};
