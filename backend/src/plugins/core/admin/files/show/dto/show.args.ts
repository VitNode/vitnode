import { ArgsType } from "@nestjs/graphql";

import { ShowCoreFilesArgs } from "@/plugins/core/files/show/dto/show.args";

@ArgsType()
export class ShowAdminFilesArgs extends ShowCoreFilesArgs {}
