"use client";

import { useEffect, useState } from "react";
import { DatabaseSelector } from "@/components/DatabaseSelector";
import { CollectionSelector } from "@/components/CollectionSelector";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { getData } from "@/actions/dataset";

interface Props {
  databases: string[];
  collections: string[];
}

export default function DatasetManager({ databases, collections }: Props) {
  const params = useSearchParams();

  const database = params.get("database") || databases[0];
  const collection = params.get("collection") || collections[0];

  const [tableData, setTableData] = useState<any[]>([]);

  const handleSaveData = async () => {
    if (tableData.length === 0) {
      return;
    }
  };

  useEffect(() => {
    getData(database, collection).then((data) => {
      setTableData(data);
    });
  }, [database, collection]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dataset Manager</h1>
      <div className="space-y-4">
        <DatabaseSelector
          selectedDatabase={database!}
          initalDatabases={databases}
        />
        {database && (
          <CollectionSelector
            key={database}
            selectedCollection={collection!}
            initialCollections={collections}
            database={database}
          />
        )}
        {collection && (
          <>
            <DataTable
              key={`${database}-${collection}`}
              data={tableData}
              setData={setTableData}
            />
            <Button onClick={handleSaveData}>Save Data</Button>
          </>
        )}
      </div>
    </div>
  );
}
