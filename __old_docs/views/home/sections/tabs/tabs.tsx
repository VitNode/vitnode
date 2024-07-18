import { AuthorizationSectionTabsHome } from "./authorization/authorization";
import { LanguageSectionTabsHome } from "./language/language";
import { PluginsSectionTabsHome } from "./plugins/plugins";
import { ThemesSectionTabsHome } from "./themes/themes";

export const TabsSectionHome = () => {
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 p-0 mb-96 mt-20 gap-10">
          <LanguageSectionTabsHome />
          <AuthorizationSectionTabsHome />
          <PluginsSectionTabsHome />
          <ThemesSectionTabsHome />
        </div>
      </div>

      <div className="bg-card">
        <div className="container py-10">
          <ul className="flex flex-col gap-5">
            <li>
              <div>SEO</div>
              <ul>
                <li>
                  - Generate a sitemap automatically - to help Google find and
                  index your website pages quicker
                </li>
                <li>- User-friendly UI elements for SEO</li>
                <li>
                  - Language-Specific URLs - Allows for URLs that are optimized
                  for each language (e.g., /en/about-us, /fr/a-propos).
                </li>
              </ul>
            </li>

            <li>
              <div>Speed</div>
              <ul>
                <li>
                  - Built-in Optimizations for Images, Fonts, Script and more
                </li>
                <li>- Server-side Streaming UI</li>
                <li>- Server Data Fetching</li>
              </ul>
            </li>

            <li>
              <div>Themes</div>
              <ul>
                <li>- Theme Switcher</li>
                <li>
                  - Dark mode included with auto detection based on users system
                </li>
                <li>
                  - Tailwind CSS, Radix UI, Shadcn UI makes you easy to style
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
