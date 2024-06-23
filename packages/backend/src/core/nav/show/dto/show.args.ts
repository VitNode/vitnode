import { ArgsType } from "@nestjs/graphql";

import { PaginationArgs } from "../../../../utils";

@ArgsType()
export class ShowCoreNavArgs extends PaginationArgs {}
