import { useSearchParams } from "next/navigation";
import { useEffect, useState, TransitionStartFunction } from "react";
import { useDebouncedCallback } from "use-debounce";

import { usePathname, useRouter } from "@/utils/i18n";

import { Input } from "../../ui/input";

interface Props {
  startTransition: TransitionStartFunction;
  searchPlaceholder?: string;
}

export const SearchToolbarDataTable = ({
  searchPlaceholder,
  startTransition
}: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const [value, setValue] = useState(searchParams.get("search") ?? "");

  // Clear search input when search param is removed
  useEffect(() => {
    if (searchParams.get("search")) return;

    setValue("");
  }, [searchParams.get("search")]);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      push(params.toString() ? `${pathname}?${params.toString()}` : pathname, {
        scroll: false
      });
    });
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
