import type { Admin_Blog_Categories__ShowQuery } from "@/graphql/hooks";

export const ContentTableForumsForumAdmin = ({
  blog_categories__show: { edges }
}: Admin_Blog_Categories__ShowQuery) => {
  return (
    <div>
      {edges.map(item => (
        <div key={item.id}>{item.color}</div>
      ))}
    </div>
  );
};
