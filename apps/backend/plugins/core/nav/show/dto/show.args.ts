import { ArgsType } from "@nestjs/graphql";

import { PaginationArgs } from "@/types/database/pagination.type";

@ArgsType()
export class ShowCoreNavArgs extends PaginationArgs {}
