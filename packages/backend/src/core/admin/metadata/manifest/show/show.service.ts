import { Injectable } from '@nestjs/common';

import { ShowAdminManifestMetadataObj } from './dto/show.obj';
import { getManifest } from '../functions';

@Injectable()
export class ShowAdminManifestMetadataService {
  show(): ShowAdminManifestMetadataObj {
    return getManifest({ lang_code: 'en' });
  }
}
