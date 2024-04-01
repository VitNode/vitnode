import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const getQueryClient = cache((): QueryClient => new QueryClient());
export default getQueryClient;
