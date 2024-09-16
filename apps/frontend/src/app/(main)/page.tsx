import React from 'react';
import {
  DefaultPage,
  DefaultPageProps,
  generateMetadataDefaultPage,
} from 'vitnode-frontend/views/theme/views/default-page';

export const generateMetadata = generateMetadataDefaultPage;

export default function Page(props: DefaultPageProps) {
  return (
    <DefaultPage
      pathToDefaultPage={async plugin =>
        import(`@/plugins/${plugin}/templates/default-page`)
      }
      {...props}
    />
  );
}
