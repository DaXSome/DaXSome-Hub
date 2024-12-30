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

  const { database: dbParams } = await searchParams;

  const database = dbParams ?? databases[0];

  const collections = await getCollections(database);

  return <DatasetManager databases={databases} collections={collections} />;
}
