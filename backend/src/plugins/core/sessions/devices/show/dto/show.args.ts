import { ArgsType } from "@nestjs/graphql";

import { PaginationArgs } from "@/utils/types/database/pagination.type";

@ArgsType()
export class ShowCoreSessionDevicesArgs extends PaginationArgs {}
