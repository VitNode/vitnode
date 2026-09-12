import type { readSessionFromApi } from "./default-transport";

export type SessionApi = Awaited<ReturnType<typeof readSessionFromApi>>;
