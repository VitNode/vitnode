import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "vitnode-frontend/components";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import { useInstallVitnode } from "../../hooks/use-install-vitnode";

export const FormLicenseInstallConfigs = () => {
  const tCore = useTranslations("core");
  const { setCurrentStep } = useInstallVitnode();

  const formSchema = z.object({
    agree: z.boolean({
      required_error: tCore("forms.empty"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agree: false,
    },
  });

  const onSubmit = () => {
    setCurrentStep(prev => prev + 1);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-start gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>
                I agree to the terms of the license agreement.
              </FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!form.watch("agree")}>
          Next step
        </Button>
      </form>
    </Form>
  );
};
