import React from "react";

import type { DashboardActions } from "../widgets/dashboard-actions";
import type {
  DashboardWidgetOption,
  DashboardWidgetView,
} from "../widgets/types";
import type { DashboardLayoutAction } from "./layout-reducer";

export interface DashboardBoardContextProps {
  actions: DashboardActions;
  available: DashboardWidgetOption[];
  dispatch: React.Dispatch<DashboardLayoutAction>;
  isDirty: boolean;
  isEditing: boolean;
  isPending: boolean;
  onCancel: () => void;
  onSave: () => void;
  placed: DashboardWidgetView[];
  refreshWidget: (instanceId: string) => void;
  setIsEditing: (isEditing: boolean) => void;
}

export const DashboardBoardContext =
  React.createContext<DashboardBoardContextProps | null>(null);

export const useDashboardBoard = () => {
  const context = React.use(DashboardBoardContext);
  if (!context) {
    throw new Error(
      "useDashboardBoard must be used within a DashboardBoardProvider.",
    );
  }

  return context;
};
