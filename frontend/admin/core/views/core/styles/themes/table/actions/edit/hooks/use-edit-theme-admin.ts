import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import type { ActionsItemThemesAdminProps } from "../../actions";

export const useEditThemeAdmin = ({
  author,
  author_url,
  name,
  support_url
}: ActionsItemThemesAdminProps) => {
  const formSchema = z.object({
    name: z.string().min(3).max(50),
    support_url: z.string().url().or(z.literal("")),
    author: z.string().min(3).max(50),
    author_url: z.string().url()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      support_url: support_url ?? "",
      author,
      author_url
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // const mutation = await mutationApi({
    //   name: values.name,
    //   supportUrl: values.support_url,
    //   author: values.author,
    //   authorUrl: values.author_url
    // });
    // if (mutation.error) {
    //   toast.error(tCore("errors.title"), {
    //     description: tCore("errors.internal_server_error")
    //   });
    //   return;
    // }
    // push(pathname);
    // toast.success(t("success"), {
    //   description: values.name
    // });
    // setOpen(false);
  };

  return {
    form,
    onSubmit
  };
};
