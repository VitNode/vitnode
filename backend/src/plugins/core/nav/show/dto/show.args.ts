import { PaginationArgs } from "@/utils/types/database/pagination.type";
import { ArgsType } from "@nestjs/graphql";

@ArgsType()
export class ShowCoreNavArgs extends PaginationArgs {}
