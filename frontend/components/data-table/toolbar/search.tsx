import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { usePathname, useRouter } from "@/i18n";

import { Input } from "../../ui/input";

interface Props {
  searchPlaceholder?: string;
}

export const SearchToolbarDataTable = ({ searchPlaceholder }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const [value, setValue] = useState(searchParams.get("search") ?? "");

  // Update the value if the search param changes
  useEffect(() => {
    if (searchParams.get("search") === value) return;

    setValue(searchParams.get("search") ?? "");
  }, [searchParams.get("search")]);

  return (
    <Input
      placeholder={searchPlaceholder}
      value={value}
      onChange={e => {
        setValue(e.target.value);
        const params = new URLSearchParams(searchParams);
        if (e.target.value) {
          params.set("search", e.target.value);
        } else {
          params.delete("search");
        }

        push(params.toString() ? `${pathname}?${params.toString()}` : pathname);
      }}
      className="w-[150px] lg:w-[250px] flex-grow"
    />
  );
};
