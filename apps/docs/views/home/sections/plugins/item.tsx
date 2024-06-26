import Link from "next/link";

export interface ItemPluginsSectionHomeProps {
  href: string;
  icon: JSX.Element;
  name: string;
  soon?: boolean;
}

export const ItemPluginsSectionHome = ({
  href,
  icon,
  name
}: ItemPluginsSectionHomeProps) => {
  return (
    <li className="flex-1 max-w-36">
      <Link
        href={href}
        className="flex flex-col items-center justify-center gap-2 hover:bg-background py-5 [&>svg]:size-8 rounded-md relative transition-colors [&>svg]:text-primary text-muted-foreground hover:text-foreground"
      >
        {icon}
        <span className="font-semibold text-lg uppercase">{name}</span>
      </Link>
    </li>
  );
};
