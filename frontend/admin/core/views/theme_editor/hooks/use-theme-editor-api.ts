import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRef } from "react";

import { useRouter } from "@/i18n";
import { getHSLFromString } from "@/functions/colors";

const zObjectHsl = z.object({
  h: z.number(),
  s: z.number(),
  l: z.number()
});
const zObjectHslWithTheme = z.object({
  light: zObjectHsl,
  dark: zObjectHsl
});

export const useThemeEditorApi = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { push } = useRouter();
  const formSchema = z.object({
    color_primary: zObjectHslWithTheme
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color_primary: {
        light: {
          h: 0,
          s: 0,
          l: 0
        },
        dark: {
          h: 0,
          s: 0,
          l: 0
        }
      }
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line no-console
    console.log(values);
    //  push("/");
  };

  const changeColor = ({ color, name }: { color: string; name: string }) => {
    const iframe =
      iframeRef.current?.contentWindow?.document.querySelector("html");
    const hslFromColor = getHSLFromString(color);

    if (iframe && hslFromColor) {
      iframe.style.setProperty(
        name,
        `${hslFromColor.h} ${hslFromColor.s}% ${hslFromColor.l}%`
      );
    }
  };

  return {
    form,
    onSubmit,
    iframeRef,
    changeColor
  };
};
