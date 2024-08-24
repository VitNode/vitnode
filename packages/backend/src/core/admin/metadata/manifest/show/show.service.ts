import { Injectable } from '@nestjs/common';

import { getManifest } from '../functions';
import { ShowAdminManifestMetadataObj } from './dto/show.obj';

@Injectable()
export class ShowAdminManifestMetadataService {
  show(): ShowAdminManifestMetadataObj {
    return getManifest({ lang_code: 'en' });
  }
}
