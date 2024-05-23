import { redirect } from "@/utils/i18n";

interface Props {
  params: {
    code: string;
  };
}

export default function Page({ params: { code } }: Props) {
  redirect(`/admin/core/plugins/${code}/dev/overview`);
}
