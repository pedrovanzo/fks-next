'use client';

import { useState } from 'react';
import type { Link } from '@/app/types';

type LinkData = Pick<Link, 'url'> & Partial<Pick<Link, 'title' | 'description'>>;

export function useLinks() {
  const [links, setLinks] = useState<Link[]>([]);

  const createLink = (data: LinkData, parentType: 'folder' | 'session', parentId: string) => {
    setLinks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), parentType, parentId, ...data, createdAt: new Date().toISOString() },
    ]);
  };

  const updateLink = (id: string, data: LinkData) => {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...data } : l)));
  };

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const deleteLinksInFolders = (folderIds: Set<string>) => {
    setLinks((prev) => prev.filter((l) => !(l.parentType === 'folder' && folderIds.has(l.parentId))));
  };

  const deleteLinksInSessions = (sessionIds: Set<string>) => {
    setLinks((prev) => prev.filter((l) => !(l.parentType === 'session' && sessionIds.has(l.parentId))));
  };

  return { links, createLink, updateLink, deleteLink, deleteLinksInFolders, deleteLinksInSessions };
}
