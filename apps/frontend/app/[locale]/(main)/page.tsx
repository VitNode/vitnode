// ! DO NOT REMOVE, MODIFY OR MOVE THIS FILE!!!

import React from 'react';
import {
  generateMetadataDefaultPage,
  DefaultPageProps,
  DefaultPage,
} from 'vitnode-frontend/views/theme/views/default-page';

export const generateMetadata = generateMetadataDefaultPage;

export default async function Page(props: DefaultPageProps) {
  return (
    <DefaultPage
      pathToDefaultPage={async plugin =>
        import(`../../../plugins/${plugin}/templates/default-page`)
      }
      {...props}
    />
  );
}
