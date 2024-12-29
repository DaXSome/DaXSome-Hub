import { getCollections, getDatabases } from "@/actions/dataset";
import DatasetManager from "@/components/dashboard/DatasetManager";

export default async function Page() {
  const databases = await getDatabases();

  if (!databases) {
    throw new Error("failed to get databases");
  }

  const collections = await getCollections(databases[0]);

  return <DatasetManager databases={databases} collections={collections} />;
}
