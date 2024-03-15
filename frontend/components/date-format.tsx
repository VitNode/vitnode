"use client";

import { useLocale } from "next-intl";
import * as localeDate from "date-fns/locale";
import { format, formatDistance } from "date-fns";
import { forwardRef } from "react";

import { convertUnixTime } from "@/functions/date";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./ui/tooltip";
import { useGlobals } from "@/hooks/core/use-globals";

interface Props {
  date: number | Date;
  className?: string;
}

export const DateFormat = forwardRef<HTMLSpanElement, Props>(
  ({ className, date }, ref) => {
    const currentLocale = useLocale();
    const { languages } = useGlobals();
    const currentLanguage = languages.find(
      language => language.code === currentLocale
    );

    const currentTime =
      typeof date === "number" ? convertUnixTime(date) : new Date(date);

    const relative = Math.floor(
      (new Date().getTime() - currentTime.getTime()) / 1000
    );

    const getDateFormat = (dateFormat: string) => {
      const locale = currentLanguage?.locale || "enUS";

      return format(currentTime, dateFormat, {
        locale: localeDate[locale as keyof typeof localeDate]
      });
    };

    // console.log(Object.keys(localeDate));

    const fullDate = getDateFormat("P p");

    const getDateWithFormatDistance = () => {
      // When date is < 1 day
      if (relative < 86400) {
        const locale = currentLanguage?.locale || "enUS";

        return formatDistance(currentTime, new Date(), {
          addSuffix: true,
          locale: localeDate[locale as keyof typeof localeDate]
        });
      }

      // When date is < 7 days
      if (relative < 604800) {
        return getDateFormat(
          currentLanguage?.time_24 ? "EEEE, H:mm" : "EEEE, H:mm a"
        );
      }

      // When date is < 1 year
      return getDateFormat(
        currentLanguage?.time_24 ? "d MMMM, H:mm" : "MMMM d, H:mm a"
      );
    };

    if (currentTime.getFullYear() == new Date().getFullYear()) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span ref={ref} className={className}>
                {getDateWithFormatDistance()}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <span>{fullDate}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <span ref={ref} className={className}>
        {fullDate}
      </span>
    );
  }
);

DateFormat.displayName = "DateFormat";
