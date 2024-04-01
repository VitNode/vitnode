import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n";
import { cn } from "@/functions/classnames";
import { ItemForum, type ItemForumProps } from "../item/item";
import type { ShowForumForumsWithChildren } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { ReadOnlyEditor } from "@/components/editor/read-only/read-only-editor";
import { WrapperCategoryForum } from "./wrapper";
import { ChevronCategoryForumButton } from "./chevron-button";
import { ChildrenWrapperCategoryForum } from "./children-wrapper";

interface Props
  extends Pick<ShowForumForumsWithChildren, "description" | "id" | "name"> {
  children?: ItemForumProps[] | null;
}

export const CategoryForum = ({
  children,
  description,
  id,
  name
}: Props): JSX.Element => {
  const { convertNameToLink, convertText } = useTextLang();

  return (
    <WrapperCategoryForum id={id}>
      <Card>
        <CardContent className="p-0">
          <div
            className={cn("px-6 py-4 flex items-center gap-4 justify-between", {
              //  'border-b': children && children.length > 0
            })}
          >
            <div>
              <Link
                href={`/forum/${convertNameToLink({ id, name })}`}
                className="font-medium text-foreground no-underline"
              >
                {convertText(name)}
              </Link>

              {description.length > 0 && (
                <ReadOnlyEditor
                  id={`${id}_description`}
                  className="text-muted-foreground text-sm [&_p]:m-0"
                  value={description}
                />
              )}
            </div>

            {children && children.length > 0 && (
              <ChevronCategoryForumButton id={id} />
            )}
          </div>

          {children && children.length > 0 && (
            <ChildrenWrapperCategoryForum>
              {children.map(
                (child): JSX.Element => (
                  <ItemForum key={child.id} {...child} />
                )
              )}
            </ChildrenWrapperCategoryForum>
          )}
        </CardContent>
      </Card>
    </WrapperCategoryForum>
  );
};
