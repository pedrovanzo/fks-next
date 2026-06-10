'use client';

import { useState } from 'react';
import type { Session } from '@/app/types';

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);

  const createSession = (name: string, folderId: string) => {
    setSessions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, folderId, createdAt: new Date().toISOString() },
    ]);
  };

  const renameSession = (id: string, name: string) => {
    setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, name } : s)));
  };

  // Returns deleted session IDs so callers can cascade link deletion.
  const deleteSession = (id: string): Set<string> => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    return new Set([id]);
  };

  // Called when a parent folder is deleted; returns all affected session IDs.
  const deleteSessionsInFolders = (folderIds: Set<string>): Set<string> => {
    const toDelete = new Set(
      sessions.filter((s) => folderIds.has(s.folderId)).map((s) => s.id),
    );
    setSessions((prev) => prev.filter((s) => !toDelete.has(s.id)));
    return toDelete;
  };

  return { sessions, createSession, renameSession, deleteSession, deleteSessionsInFolders };
}
