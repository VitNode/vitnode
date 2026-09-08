export type SSOIconComponent = React.ElementType<{ className?: string }>;

export type SSOIcon = React.ReactElement | SSOIconComponent;

const registered = new Map<string, SSOIcon>();

export const configureSSOIcons = (icons: Record<string, SSOIcon>) => {
  for (const [providerId, icon] of Object.entries(icons)) {
    registered.set(providerId, icon);
  }
};

export const ssoIcon = (providerId: string): SSOIcon | undefined =>
  registered.get(providerId);

export const resetSSOIcons = () => registered.clear();
