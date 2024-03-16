import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

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

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    push(params.toString() ? `${pathname}?${params.toString()}` : pathname);
  }, 500);

  return (
    <Input
      placeholder={searchPlaceholder}
      value={value}
      onChange={e => {
        const value = e.target.value;
        setValue(value);
        handleSearch(value);
      }}
      className="w-[150px] lg:w-[250px] flex-grow"
    />
  );
};
