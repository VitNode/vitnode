import {
  CreateEditTopic,
  type EditTopicData
} from "../../create-edit/create-edit";

export interface EditTopicViewProps {
  data: EditTopicData;
}

export default function EditTopicView({
  data
}: EditTopicViewProps): JSX.Element {
  return <CreateEditTopic data={data} />;
}
