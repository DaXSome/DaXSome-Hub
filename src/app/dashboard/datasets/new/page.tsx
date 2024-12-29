import { getDatabases } from "@/actions/dataset";
import DatasetManager from "@/components/dashboard/DatasetManager";

export default async function Page() {
  const databases = await getDatabases();

  if (!databases) {
    throw new Error("failed to get databases");
  }

  return <DatasetManager databases={databases} />;
}
