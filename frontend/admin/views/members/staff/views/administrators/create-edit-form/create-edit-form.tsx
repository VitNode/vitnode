import { useTranslations } from 'next-intl';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useFormCreateEditFormGroupsMembersAdmin } from './hooks/use-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { UserInput } from '@/components/user/inputs/user-input';
import { GroupInput } from '@/components/groups/input/group-input';

export const CreateEditFormAdministratorsStaffAdmin = () => {
  const t = useTranslations('admin.members.staff.administrators');
  const { form, onSubmit } = useFormCreateEditFormGroupsMembersAdmin();

  return (
    <>
      <DialogHeader className="flex flex-col gap-4">
        <DialogTitle>{t('add')}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('create_edit.type.title')}</FormLabel>
                <RadioGroup
                  onValueChange={() => {
                    form.setValue('user', undefined);
                    form.setValue('group', undefined);
                    field.onChange();
                  }}
                  defaultValue={field.value}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="group" id="r1" />
                    <Label htmlFor="r1">{t('create_edit.type.group')}</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="r2" />
                    <Label htmlFor="r2">{t('create_edit.type.user')}</Label>
                  </div>
                </RadioGroup>
              </FormItem>
            )}
          />

          {form.watch('type') === 'user' ? (
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('create_edit.type.user')}</FormLabel>
                  <UserInput {...field} />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('create_edit.type.group')}</FormLabel>
                  <GroupInput {...field} />
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>
    </>
  );
};
