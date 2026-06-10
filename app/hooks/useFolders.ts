'use client';

import { useState } from 'react';
import type { Folder } from '@/app/types';
import { getDescendantIds } from '@/app/lib/tree';

export function useFolders() {
  const [folders, setFolders] = useState<Folder[]>([]);

  const createFolder = (name: string, parentId: string) => {
    setFolders((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, parentId, createdAt: new Date().toISOString() },
    ]);
  };

  const renameFolder = (id: string, name: string) => {
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
  };

  // Returns the full set of deleted IDs so callers can cascade (links, path, etc.)
  const deleteFolder = (id: string): Set<string> => {
    const toDelete = getDescendantIds(folders, id);
    setFolders((prev) => prev.filter((f) => !toDelete.has(f.id)));
    return toDelete;
  };

  return { folders, createFolder, renameFolder, deleteFolder };
}
