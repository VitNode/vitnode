import { createVitNodeStart } from "@vitnode/core/tanstack/start";

import { vitNodePublicConfig } from "@/vitnode.public.gen";

export const startInstance = createVitNodeStart({ config: vitNodePublicConfig });
