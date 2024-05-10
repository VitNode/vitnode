import { useLocale } from "next-intl";
import * as localeDate from "date-fns/locale";
import { format, formatDistance } from "date-fns";

import { useGlobals } from "@/hooks/core/use-globals";
import { convertUnixTime } from "@/functions/date";

interface Args {
  date: number | Date;
}

export const useDateFormat = ({ date }: Args) => {
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

  return {
    fullDate,
    getDateWithFormatDistance,
    currentTime,
    getDateFormat,
    currentLanguage
  };
};
