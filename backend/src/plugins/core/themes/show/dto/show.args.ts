import { ArgsType } from "@nestjs/graphql";
import { PaginationArgs } from "@vitnode/backend";

@ArgsType()
export class ShowCoreThemesArgs extends PaginationArgs {}
