import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodInput } from "@/functions/zod";

export const useDeleteForumAdmin = () => {
  const formSchema = z.object({
    move_forums_to: z.object({
      id: z.number().min(1),
      name: zodInput.languageInput
    }),
    move_topics_to: z.object({
      id: z.number().min(1),
      name: zodInput.languageInput
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return { form, onSubmit };
};
