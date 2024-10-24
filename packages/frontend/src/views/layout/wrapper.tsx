import React from 'react';

export const WrapperRootLayout = ({
  locale,
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
  locale: string;
}) => {
  return (
    <html className={className} lang={locale} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
};
