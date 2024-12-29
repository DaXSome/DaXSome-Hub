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

const mockCollections: Record<string, string[]> = {
  "Database 1": ["Collection 1", "Collection 2"],
  "Database 2": ["Collection 3", "Collection 4"],
  "Database 3": ["Collection 5", "Collection 6"],
};

export function CollectionSelector({
  database,
  onSelect,
}: {
  database: string;
  onSelect: (collection: string) => void;
}) {
  const [collections, setCollections] = useState(
    mockCollections[database] || [],
  );
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateCollection = () => {
    if (collections.includes(newCollectionName)) {
      return;
    }

    setCollections([...collections, newCollectionName]);
    onSelect(newCollectionName);
    setNewCollectionName("");
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="collection-select">Select Collection</Label>
      <div className="flex space-x-2">
        <Select onValueChange={onSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a collection" />
          </SelectTrigger>
          <SelectContent>
            {collections.map((collection) => (
              <SelectItem key={collection} value={collection}>
                {collection}
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
              <DialogTitle>Create New Collection</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Collection Name</Label>
                <Input
                  id="name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                />
              </div>
              <Button onClick={handleCreateCollection}>
                Create Collection
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
