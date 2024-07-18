import { EmailsSectionFeatures } from './sections/emails';
import { I18nSectionFeatures } from './sections/i18n';
import { PluginsSectionFeatures } from './sections/plugins';
import { SecureSectionFeatures } from './sections/secure';

export const FeaturesHome = () => {
  return (
    <div className="container my-20 space-y-16 lg:space-y-32">
      <PluginsSectionFeatures />
      <EmailsSectionFeatures />
      <I18nSectionFeatures />
      <SecureSectionFeatures />
    </div>
  );
};
