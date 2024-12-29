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

const mockDatabases = ["Database 1", "Database 2", "Database 3"];

export function DatabaseSelector({
  onSelect,
}: {
  onSelect: (database: string) => void;
}) {
  const [databases, setDatabases] = useState(mockDatabases);
  const [newDatabaseName, setNewDatabaseName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateDatabase = () => {
    if (databases.includes(newDatabaseName)) {
      return;
    }

    setDatabases([...databases, newDatabaseName]);
    onSelect(newDatabaseName);
    setNewDatabaseName("");
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="database-select">Select Database</Label>
      <div className="flex space-x-2">
        <Select onValueChange={onSelect}>
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
