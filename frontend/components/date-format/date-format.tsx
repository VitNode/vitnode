import { useLocale } from "next-intl";
import { enUS, pl } from "date-fns/locale";
import { format, formatDistance } from "date-fns";

import { convertUnixTime } from "@/functions/date";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip";

interface Props {
  date: number;
  className?: string;
}

export const DateFormat = ({ className, date }: Props) => {
  const locale = useLocale();
  const currentTime = convertUnixTime(date);

  const relative = Math.floor(
    (new Date().getTime() - currentTime.getTime()) / 1000
  );

  const getDateFormat = (dateFormat: string) => {
    return format(currentTime, dateFormat, {
      locale: locale === "pl" ? pl : enUS
    });
  };

  const fullDate = getDateFormat("P p");

  const getDateWithFormatDistance = () => {
    // When date is < 1 day
    if (relative < 86400) {
      return formatDistance(currentTime, new Date(), {
        addSuffix: true,
        locale: locale === "pl" ? pl : enUS
      });
    }

    // When date is < 7 days
    if (relative < 604800) {
      return getDateFormat(locale === "pl" ? "EEEE, H:mm" : "EEEE, H:mm a");
    }

    // When date is < 1 year
    return getDateFormat(locale === "pl" ? "d MMMM, H:mm" : "MMMM d, H:mm a");
  };

  if (currentTime.getFullYear() == new Date().getFullYear()) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={className}>{getDateWithFormatDistance()}</span>
          </TooltipTrigger>
          <TooltipContent>
            <span>{fullDate}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <span className={className}>{fullDate}</span>;
};
