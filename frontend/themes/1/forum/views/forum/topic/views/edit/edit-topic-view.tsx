import { CreateEditTopic, EditTopicData } from "../../create-edit/create-edit";

export interface EditTopicViewProps {
  data: EditTopicData;
}

export default function EditTopicView({ data }: EditTopicViewProps) {
  return <CreateEditTopic data={data} />;
}
