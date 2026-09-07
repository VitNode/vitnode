import { useEditorState } from "@tiptap/react";
import { cn } from "cn";
import {
  BetweenHorizontalStartIcon,
  BetweenVerticalStartIcon,
  CombineIcon,
  Grid2x2PlusIcon,
  Grid3x3Icon,
  PanelLeftIcon,
  PanelTopIcon,
  Trash2Icon,
} from "lucide-react";
import { useTranslations } from "use-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useToolbarEditor } from "../use-toolbar-editor";

export const TableAction = () => {
  const t = useTranslations("core.global.editor.table");
  const { editor } = useToolbarEditor();
  const isInTable = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive("table"),
  });

  const actions = [
    {
      icon: <BetweenVerticalStartIcon />,
      label: t("add_column_before"),
      run: () => editor.chain().focus().addColumnBefore().run(),
    },
    {
      icon: <BetweenVerticalStartIcon className="rotate-180" />,
      label: t("add_column_after"),
      run: () => editor.chain().focus().addColumnAfter().run(),
    },
    {
      icon: <BetweenHorizontalStartIcon />,
      label: t("add_row_before"),
      run: () => editor.chain().focus().addRowBefore().run(),
    },
    {
      icon: <BetweenHorizontalStartIcon className="rotate-180" />,
      label: t("add_row_after"),
      run: () => editor.chain().focus().addRowAfter().run(),
    },
    {
      icon: <PanelTopIcon />,
      label: t("toggle_header_row"),
      run: () => editor.chain().focus().toggleHeaderRow().run(),
    },
    {
      icon: <PanelLeftIcon />,
      label: t("toggle_header_column"),
      run: () => editor.chain().focus().toggleHeaderColumn().run(),
    },
    {
      icon: <CombineIcon />,
      label: t("merge_or_split"),
      run: () => editor.chain().focus().mergeOrSplit().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label={t("label")}
            className={cn({ "bg-accent": isInTable })}
            size="icon-sm"
            variant="ghost"
          />
        }
      >
        <Grid3x3Icon />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-56">
        <DropdownMenuItem
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <Grid2x2PlusIcon />
          {t("insert")}
        </DropdownMenuItem>

        {isInTable && (
          <>
            <DropdownMenuSeparator />

            {actions.map(item => (
              <DropdownMenuItem key={item.label} onClick={item.run}>
                {item.icon}
                {item.label}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => editor.chain().focus().deleteColumn().run()}
              variant="destructive"
            >
              <Trash2Icon />
              {t("delete_column")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().deleteRow().run()}
              variant="destructive"
            >
              <Trash2Icon />
              {t("delete_row")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().deleteTable().run()}
              variant="destructive"
            >
              <Trash2Icon />
              {t("delete")}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
