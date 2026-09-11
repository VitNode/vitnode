import { NotificationListener } from "@/views/layouts/theme/notification-listener";
import { WebSocketAuthSync } from "@/views/layouts/theme/web-socket-auth-sync";

import { useSessionQuery } from "../auth/session-query";
import { socketUserIdFromSession } from "./session";

export const RealtimeListeners = () => {
  const { data: session } = useSessionQuery();

  return (
    <>
      <NotificationListener />
      <WebSocketAuthSync userId={socketUserIdFromSession(session)} />
    </>
  );
};
