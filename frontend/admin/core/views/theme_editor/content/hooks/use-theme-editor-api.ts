import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useRouter } from "@/i18n";

export const useThemeEditorApi = () => {
  const { push } = useRouter();
  const formSchema = z.object({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  });

  const onSubmit = () => {
    push("/");
  };

  return {
    form,
    onSubmit
  };
};
