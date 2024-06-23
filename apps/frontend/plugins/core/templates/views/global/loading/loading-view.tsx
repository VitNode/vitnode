import { useTranslations } from "next-intl";
import { cn } from "vitnode-frontend/helpers";
import { Card, CardHeader, Loader } from "vitnode-frontend/components";

interface Props {
  className?: string;
  global?: boolean;
}

export const LoadingView = ({ className, global }: Props) => {
  const t = useTranslations("core");

  const content = (
    <Card>
      <CardHeader className="items-center gap-2 text-center">
        {t("loading")} <Loader />
      </CardHeader>
    </Card>
  );

  if (global)
    return <div className={cn("mx-auto max-w-sm", className)}>{content}</div>;

  return content;
};
