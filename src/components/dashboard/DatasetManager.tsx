"use client";

import { useEffect, useState } from "react";
import { DatabaseSelector } from "@/components/DatabaseSelector";
import { CollectionSelector } from "@/components/CollectionSelector";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { getData, saveData } from "@/actions/dataset";

interface Props {
  databases: string[];
  collections: string[];
}

export default function DatasetManager({ databases, collections }: Props) {
  const params = useSearchParams();
  const router = useRouter();

  const database = params.get("database") || databases[0];
  const collection = params.get("collection") || collections[0];

  const [tableData, setTableData] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    const { data, count } = await getData(database, collection);

    setTableData(data);
    setCount(count);
  };

  const handleSaveData = async () => {
    if (tableData.length === 0) {
      return;
    }

    const newData = tableData
      .filter((data) => !data._id)
      .map((data) => {
        const newData = { ...data };

        delete newData._id;

        return newData;
      });

    setIsLoading(true);

    await saveData(database, collection, newData);

    await loadData()

    setIsLoading(false);

  };

  useEffect(() => {
    loadData();
  }, [database, collection]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dataset Manager</h1>
      <div className="space-y-4">
        <DatabaseSelector selectedDatabase={database!} databases={databases} />
        {database && (
          <CollectionSelector
            key={database}
            selectedCollection={collection!}
            collections={collections}
            database={database}
          />
        )}
        {collection && (
          <>
            <span className="mt-4 mb-4">{count} Documents </span>
            <DataTable
              key={`${database}-${collection}-${tableData.length}`}
              data={tableData}
              setData={setTableData}
            />
            <Button disabled={isLoading} onClick={handleSaveData}>
              Save Data
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
