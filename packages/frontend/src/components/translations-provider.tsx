import { NamespaceKeys, NestedKeyOf, NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

const pick = (obj: object, paths: string[]) => {
  const result = {};
  for (const path of paths) {
    const keys = path.split('.');
    let src: object | undefined = obj;
    let dest = result;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (src && Object.prototype.hasOwnProperty.call(src, key)) {
        if (i === keys.length - 1) {
          dest[key] = src[key];
        } else {
          if (!dest[key]) {
            dest[key] = {};
          }
          dest = dest[key];
          src = src[key];
        }
      } else {
        break;
      }
    }
  }

  return result;
};

export async function TranslationsProvider<
  NestedKey extends NamespaceKeys<
    IntlMessages,
    NestedKeyOf<IntlMessages>
  > = never,
>({
  children,
  namespaces,
}: {
  children: React.ReactNode;
  namespaces: NestedKey | NestedKey[];
}) {
  const locale = await getLocale();
  const messagesInit = await getMessages({ locale });
  const messages = pick(messagesInit, [
    'core.global',
    ...(Array.isArray(namespaces) ? namespaces : [namespaces]),
  ]);

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
