import { Injectable } from '@nestjs/common';

import { DeleteCoreAttachmentsService } from '../../../attachments/delete/delete-core_attachments.service';
import { User } from '../../../../../utils/decorators/user.decorator';

@Injectable()
export class DeleteAvatarCoreMembersService {
  constructor(private readonly service: DeleteCoreAttachmentsService) {}

  async deleteAvatar({ id }: User): Promise<string> {
    const test = await this.service.deleteFile({
      module: 'core_members',
      module_id: id
    });

    return 'Success!';
  }
}
