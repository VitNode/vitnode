import React from 'react';

export const WrapperRootLayout = ({
  locale,
  className,
  children,
}: {
  children: React.ReactNode;
  locale: string;
  className?: string;
}) => {
  return (
    <html lang={locale} className={className} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
};
