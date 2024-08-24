import { PaginationArgs } from '@/utils';
import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class ShowCoreNavArgs extends PaginationArgs {}
