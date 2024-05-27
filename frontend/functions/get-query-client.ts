import { QueryClient } from "@tanstack/react-query";
import * as React from "react";

const getQueryClient = React.cache(() => new QueryClient());
export default getQueryClient;
