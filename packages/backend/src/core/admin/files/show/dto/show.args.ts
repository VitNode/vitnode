import { ShowCoreFilesArgs } from '@/core/files/show/dto/show.args';
import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class ShowAdminFilesArgs extends ShowCoreFilesArgs {}
