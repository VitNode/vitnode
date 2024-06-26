import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import {
  FormField,
  FormFieldRender,
} from 'vitnode-frontend/components/ui/form';
import {
  RadioGroup,
  RadioGroupItem,
} from 'vitnode-frontend/components/ui/radio-group';
import { Label } from 'vitnode-frontend/components/ui/label';
import { Separator } from 'vitnode-frontend/components/ui/separator';
import { HeaderContent } from 'vitnode-frontend/components/ui/header-content';

export const FilesSectionContentEditorAdmin = () => {
  const t = useTranslations('admin.core.styles.editor');
  const form = useFormContext();

  return (
    <>
      <div className="w-full space-y-2">
        <HeaderContent h2={'Files'} className="m-0" />

        <Separator />
      </div>

      <FormField
        control={form.control}
        name="files.allow_type"
        render={({ field }) => (
          <FormFieldRender label={t('files.allow_type.title')}>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="all" id="files.allow_type.all" />
                <Label htmlFor="files.allow_type.all">
                  {t('files.allow_type.all')}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="images_videos"
                  id="files.allow_type.images_videos"
                />
                <Label htmlFor="files.allow_type.images_videos">
                  {t('files.allow_type.images_videos')}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="images" id="files.allow_type.images" />
                <Label htmlFor="files.allow_type.images">
                  {t('files.allow_type.images')}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="none" id="files.allow_type.none" />
                <Label htmlFor="files.allow_type.none">
                  {t('files.allow_type.none')}
                </Label>
              </div>
            </RadioGroup>
          </FormFieldRender>
        )}
      />
    </>
  );
};
