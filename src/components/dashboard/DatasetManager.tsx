"use client";

import { useState } from "react";
import { DatabaseSelector } from "@/components/DatabaseSelector";
import { CollectionSelector } from "@/components/CollectionSelector";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";

interface Props {
  databases: string[];
}

export default function DatasetManager({ databases }: Props) {
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(
    databases[0],
  );
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  );
  const [tableData, setTableData] = useState<any[]>([]);

  const handleSaveData = async () => {
    if (!selectedDatabase || !selectedCollection) {
      return;
    }

    if (tableData.length === 0) {
      return;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dataset Manager</h1>
      <div className="space-y-4">
        <DatabaseSelector
          selectedDatabase={selectedDatabase!}
          initalDatabases={databases}
          onSelect={setSelectedDatabase}
        />
        {selectedDatabase && (
          <CollectionSelector
            database={selectedDatabase}
            onSelect={setSelectedCollection}
          />
        )}
        {selectedCollection && (
          <>
            <DataTable data={tableData} setData={setTableData} />
            <Button onClick={handleSaveData}>Save Data</Button>
          </>
        )}
      </div>
    </div>
  );
}