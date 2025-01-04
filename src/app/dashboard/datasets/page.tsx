import { getCollections, getDatabases } from "@/actions/dataset";
import DatasetManager from "@/components/dashboard/DatasetManager";

interface Props {
  searchParams: Promise<{ database: string; collection: string }>;
}

export default async function Page({ searchParams }: Props) {
  const databases = await getDatabases();

  if (!databases) {
    throw new Error("failed to get databases");
  }

  const params = await searchParams;

  const database = params.database ?? databases[0];

  const collections = await getCollections(database);

  if (params.database && !databases.includes(params.database)) {
    databases.push(params.database);
  }

  if (params.collection && !collections.includes(params.collection)) {
    collections.push(params.collection);
  }

  return <DatasetManager databases={databases} collections={collections} />;
}
