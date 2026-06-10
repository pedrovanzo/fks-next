'use client';

import { useState } from 'react';
import type { Folder, Session, Link } from '@/app/types';

export type FolderModal = { mode: 'create' } | { mode: 'edit'; folder: Folder } | null;
export type SessionModal = { mode: 'create' } | { mode: 'edit'; session: Session } | null;
export type LinkModal = { mode: 'create' } | { mode: 'edit'; link: Link } | null;
export type DeleteTarget =
  | { type: 'folder'; folder: Folder }
  | { type: 'session'; session: Session }
  | { type: 'link'; link: Link }
  | null;

export function useModalState() {
  const [folderModal, setFolderModal] = useState<FolderModal>(null);
  const [sessionModal, setSessionModal] = useState<SessionModal>(null);
  const [linkModal, setLinkModal] = useState<LinkModal>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);

  return {
    folderModal, setFolderModal,
    sessionModal, setSessionModal,
    linkModal, setLinkModal,
    deleteTarget, setDeleteTarget,
  };
}
