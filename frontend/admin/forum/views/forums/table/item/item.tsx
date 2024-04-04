import { useTextLang } from "@/hooks/core/use-text-lang";
import { ActionsForumAdmin } from "./actions/actions";
import type { ShowForumForumsAdminWithChildren } from "../hooks/use-forum-forums-admin-api";
import type { FlatTree } from "@/hooks/core/drag&drop/use-functions";

interface Props {
  data: FlatTree<ShowForumForumsAdminWithChildren>;
}

export const ItemTableForumsForumAdmin = ({ data }: Props) => {
  const { convertText } = useTextLang();

  return (
    <>
      <div className="flex-grow flex flex-col">
        <span>{convertText(data.name)}</span>
      </div>

      <ActionsForumAdmin childrenCount={data.children.length} {...data} />
    </>
  );
};
