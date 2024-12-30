"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

type ColumnType = "String" | "Number" | "Boolean" | "Date";

interface Column {
  name: string;
  type: ColumnType;
}

export function DataTable({
  data,
  setData,
}: {
  data: any[];
  setData: (data: any[]) => void;
}) {
  const [columns, setColumns] = useState<Column[]>([]);

  const addColumn = () => {
    const newColumn: Column = {
      name: `Column ${columns.length + 1}`,
      type: "String",
    };
    setColumns([...columns, newColumn]);
    setData(data.map((row) => ({ ...row, [newColumn.name]: "" })));
  };

  const removeColumn = (index: number) => {
    const newColumns = columns.filter((_, i) => i !== index);
    setColumns(newColumns);
    setData(
      data.map((row) => {
        const newRow = { ...row };
        delete newRow[columns[index].name];
        return newRow;
      }),
    );
  };

  const updateColumnName = (index: number, newName: string) => {
    const oldName = columns[index].name;
    const newColumns = columns.map((col, i) =>
      i === index ? { ...col, name: newName } : col,
    );
    setColumns(newColumns);
    setData(
      data.map((row) => {
        const newRow = { ...row };
        newRow[newName] = newRow[oldName];
        delete newRow[oldName];
        return newRow;
      }),
    );
  };

  const updateColumnType = (index: number, newType: ColumnType) => {
    setColumns(
      columns.map((col, i) => (i === index ? { ...col, type: newType } : col)),
    );
  };

  const addRow = () => {
    const newRow = columns.reduce(
      (acc, col) => ({ ...acc, [col.name]: "" }),
      {},
    );
    setData([...data, newRow]);
  };

  const updateCell = (rowIndex: number, columnName: string, value: string) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [columnName]: value };
    setData(newData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const lines = content.split("\n");
        const headers = lines[0].split(",");
        const newColumns = headers.map((header) => ({
          name: header.trim(),
          type: "String" as ColumnType,
        }));
        setColumns(newColumns);
        const newData = lines.slice(1).map((line) => {
          const values = line.split(",");
          return headers.reduce(
            (acc, header, index) => ({
              ...acc,
              [header.trim()]: values[index]?.trim() || "",
            }),
            {},
          );
        });
        setData(newData);
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      const headers = data[0];
      const newColumns = Object.keys(headers).map((header) => ({
        name: header,
        type: "String" as ColumnType,
      }));
      setColumns(newColumns);
    }
  }, [data]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Button onClick={addColumn}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Column
        </Button>
        <Button onClick={addRow}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Row
        </Button>
        <div>
          <Input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="border border-gray-300 p-2">
                  <Input
                    value={column.name}
                    onChange={(e) => updateColumnName(index, e.target.value)}
                    className="mb-2"
                  />
                  <Select
                    value={column.type}
                    onValueChange={(value: ColumnType) =>
                      updateColumnType(index, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="String">String</SelectItem>
                      <SelectItem value="Number">Number</SelectItem>
                      <SelectItem value="Boolean">Boolean</SelectItem>
                      <SelectItem value="Date">Date</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeColumn(index)}
                    className="mt-2"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex} className="border border-gray-300 p-2">
                    <Input
                      value={row[column.name] || ""}
                      onChange={(e) =>
                        updateCell(rowIndex, column.name, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
