import { useFormatter, useLocale, useNow } from 'next-intl';

import { useGlobalData } from '../../hooks/use-global-data';

interface Args {
  date: Date;
}

export const useDateFormat = ({ date }: Args) => {
  const currentLocale = useLocale();
  const { languages } = useGlobalData();
  const format = useFormatter();
  const currentLanguage = languages.find(
    language => language.code === currentLocale,
  );
  const dateToFormat = new Date(date);

  const now = useNow({
    // Update it every 1 minute if the date is from today, otherwise don't update
    updateInterval:
      new Date().getTime() - dateToFormat.getTime() < 86400000 ? 60000 : 0,
  });

  const fullDate = format.dateTime(dateToFormat, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: currentLanguage?.timezone,
    hour12: !currentLanguage?.time_24,
  });

  const getDate = () => {
    // When date is < 7 days
    if (now.getTime() - dateToFormat.getTime() < 604800000) {
      return format.relativeTime(dateToFormat, now);
    }

    return fullDate;
  };

  return {
    fullDate,
    getDate,
    currentLanguage,
    now,
  };
};
