import { redirect } from "@/i18n";

interface Props {
  params: {
    code: string;
  };
}

export default function Page({ params: { code } }: Props) {
  redirect(`/admin/core/plugins/${code}/dev/overview`);
}
