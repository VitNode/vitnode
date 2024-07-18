// ! DO NOT TOUCH THIS FILE!!! IT IS GENERATED BY VITNODE-CLI

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
