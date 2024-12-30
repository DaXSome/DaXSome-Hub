"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface Props {
  databases: string[];
  selectedDatabase: string;
}

export function DatabaseSelector({ databases, selectedDatabase }: Props) {
  const [newDatabaseName, setNewDatabaseName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleCreateDatabase = () => {
    if (databases.includes(newDatabaseName)) {
      return;
    }

    router.push(`?database=${newDatabaseName}`);

    setNewDatabaseName("");
    setIsOpen(false);
  };

  const onSelect = (value: string) => {
    router.push(`?database=${value}`);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="database-select">Select Database</Label>
      <div className="flex space-x-2">
        <Select value={selectedDatabase} onValueChange={onSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a database" />
          </SelectTrigger>
          <SelectContent>
            {databases.map((db) => (
              <SelectItem key={db} value={db}>
                {db}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Create New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Database</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Database Name</Label>
                <Input
                  id="name"
                  value={newDatabaseName}
                  onChange={(e) => setNewDatabaseName(e.target.value)}
                />
              </div>
              <Button onClick={handleCreateDatabase}>Create Database</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
