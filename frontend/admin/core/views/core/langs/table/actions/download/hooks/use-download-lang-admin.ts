import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { queryApi } from "./query-api";

export const useDownloadLangAdmin = () => {
  const query = useQuery({
    queryKey: ["Admin__Core_Plugins__Show"],
    queryFn: async () => await queryApi({})
  });

  const formSchema = z.object({
    all: z.boolean(),
    plugins: z.array(z.string())
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      all: true,
      plugins: []
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return { form, onSubmit, query };
};
