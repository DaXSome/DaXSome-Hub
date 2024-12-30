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
  database: string;
  collections: string[];
  selectedCollection: string;
}

export function CollectionSelector({
  database,
  selectedCollection,
  collections,
}: Props) {
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleCreateCollection = () => {
    if (collections.includes(newCollectionName)) {
      return;
    }

    router.push(`?database=${database}&collection=${newCollectionName}`);

    setNewCollectionName("");
    setIsOpen(false);
  };

  const onSelect = (value: string) => {
    router.push(`?database=${database}&collection=${value}`);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="collection-select">Select Collection</Label>
      <div className="flex space-x-2">
        <Select value={selectedCollection} onValueChange={onSelect}>
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
