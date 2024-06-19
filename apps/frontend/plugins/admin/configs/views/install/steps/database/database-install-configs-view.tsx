import { CardContent, CardFooter } from "@/components/ui/card";
import { SubmitDatabaseInstallConfigs } from "./submit-database-install-configs";

export const DatabaseInstallConfigsView = () => {
  return (
    <>
      <CardContent>
        <p>Now VitNode needs to create default records in your database.</p>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4">
        <SubmitDatabaseInstallConfigs />
      </CardFooter>
    </>
  );
};
