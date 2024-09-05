import {
  AtSign,
  Home,
  Lock,
  PaintRoller,
  Rocket,
  ShieldCheck,
  Smartphone,
  TextCursorInput,
} from 'lucide-react';
import React from 'react';

export const MoreFeaturesHome = () => {
  return (
    <div className="bg-card border-y shadow-sm">
      <div className="container my-10 flex flex-col items-center">
        <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          More <span className="text-primary">Features</span>
        </h2>

        <div className="mt-12 grid max-w-5xl grid-cols-1 gap-10 sm:mt-16 sm:grid-cols-2 md:gap-12 xl:gap-16">
          <Item title="Admin Control Panel (ACP)" icon={<Lock />}>
            Change settings, manage users, install plugins, create languages,
            legal & policies and more. Easy to use.
          </Item>
          <Item title="Email System" icon={<AtSign />}>
            Manage your emails with ease, send emails to your users, and more.
            Build-in React templates, SMTP, Resend.
          </Item>
          <Item title="Progressive Web App (PWA)" icon={<Smartphone />}>
            Install your app on any device, push notifications, manifest with
            i18n support.
          </Item>
          <Item title="Auto Form" icon={<TextCursorInput />}>
            Create form based on a zod schema with validation, submit button,
            dependencies etc.
          </Item>
          <Item title="Tailwind CSS & ShadCn UI" icon={<PaintRoller />}>
            Customize your app in seconds, dark mode, build-in components,
            custom themes, animations.
          </Item>
          <Item
            title="GraphQL"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-7 fill-current"
                viewBox="0 0 32 32"
              >
                <path d="M18.734 3.667l6.578 3.802c1.089-1.146 2.901-1.193 4.047-0.104 0.193 0.188 0.365 0.401 0.5 0.635 0.786 1.37 0.313 3.12-1.063 3.906-0.229 0.13-0.479 0.234-0.745 0.297v7.599c1.531 0.365 2.474 1.896 2.109 3.427-0.063 0.271-0.172 0.531-0.307 0.771-0.792 1.365-2.536 1.833-3.906 1.042-0.26-0.146-0.5-0.344-0.698-0.568l-6.542 3.776c0.495 1.495-0.318 3.109-1.813 3.604-0.292 0.099-0.594 0.146-0.896 0.146-1.573 0-2.854-1.271-2.854-2.849 0-0.271 0.042-0.547 0.12-0.813l-6.583-3.797c-1.089 1.141-2.896 1.188-4.036 0.094-1.135-1.089-1.177-2.891-0.094-4.031 0.38-0.396 0.865-0.677 1.396-0.807v-7.599c-1.531-0.365-2.479-1.906-2.109-3.443 0.063-0.266 0.167-0.521 0.302-0.755 0.786-1.365 2.536-1.833 3.901-1.042 0.234 0.135 0.453 0.302 0.641 0.5l6.583-3.797c-0.448-1.51 0.417-3.099 1.922-3.542 0.26-0.083 0.536-0.12 0.813-0.12 1.573 0 2.854 1.271 2.854 2.844 0 0.281-0.042 0.557-0.12 0.823zM18.047 4.839c-0.026 0.026-0.047 0.052-0.078 0.078l8.615 14.917c0.036-0.010 0.078-0.021 0.109-0.031v-7.609c-1.526-0.375-2.453-1.922-2.073-3.448 0.005-0.031 0.016-0.068 0.021-0.099zM14.026 4.917l-0.078-0.078-6.594 3.802c0.438 1.51-0.438 3.089-1.948 3.526-0.036 0.010-0.068 0.016-0.104 0.026v7.609l0.115 0.031 8.615-14.917zM16.797 5.594c-0.521 0.146-1.073 0.146-1.589 0l-8.615 14.917c0.391 0.375 0.667 0.859 0.802 1.391h17.214c0.13-0.531 0.406-1.016 0.802-1.396zM18.109 27.229l6.552-3.786c-0.021-0.063-0.036-0.125-0.052-0.188h-17.219l-0.031 0.109 6.589 3.802c0.516-0.536 1.245-0.87 2.052-0.87 0.839 0 1.589 0.359 2.109 0.932z" />
              </svg>
            }
          >
            Create queries and mutations, type-safe with codegen, Apollo
            Playground.
          </Item>
          <Item title="Friendly for Developers" icon={<Rocket />}>
            Develop fast and easy, well-documented, helpers, hooks, Prettier,
            ESLint, TypeScript, Drizzle ORM, CRON jobs and more.
          </Item>
          <Item title="Secure" icon={<ShieldCheck />}>
            Protect your app from malicious attacks and keep your users safe
            with CSRF protection, CORS, Helmet, rate limiting, captcha.
          </Item>
        </div>
      </div>
    </div>
  );
};

const Item = ({
  children,
  title,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex gap-5">
      <div className="bg-card inline-flex size-12 items-center justify-center rounded-md border">
        {icon}
      </div>
      <div className="flex-1 space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{children}</p>
      </div>
    </div>
  );
};
