'use client';

import { useState } from 'react';
import { ROOT_ID } from '@/app/types';

export function useNavigation() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const currentFolderId = currentPath.at(-1) ?? ROOT_ID;
  const isInSession = currentSessionId !== null;

  const navigateInto = (folderId: string) => {
    setCurrentSessionId(null);
    setCurrentPath((p) => [...p, folderId]);
  };

  const openSession = (sessionId: string) => setCurrentSessionId(sessionId);

  const closeSession = () => setCurrentSessionId(null);

  const navigateToIndex = (index: number) => {
    setCurrentSessionId(null);
    if (index === -1) {
      setCurrentPath([]);
    } else {
      setCurrentPath((p) => p.slice(0, index + 1));
    }
  };

  const resetPath = () => {
    setCurrentSessionId(null);
    setCurrentPath([]);
  };

  return {
    currentPath,
    currentFolderId,
    currentSessionId,
    isInSession,
    navigateInto,
    openSession,
    closeSession,
    navigateToIndex,
    resetPath,
  };
}
