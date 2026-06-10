'use client';

import { useState } from 'react';
import { FolderPlus, Link2, BookMarked } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import { FolderItem } from './FolderItem';
import { LinkItem } from './LinkItem';
import { FolderFormModal } from './FolderFormModal';
import { LinkFormModal } from './LinkFormModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import type { Folder, Link } from '@/app/types';
import { ROOT_ID } from '@/app/types';

type FolderModal = { mode: 'create' } | { mode: 'edit'; folder: Folder } | null;
type LinkModal = { mode: 'create' } | { mode: 'edit'; link: Link } | null;
type DeleteTarget =
  | { type: 'folder'; folder: Folder }
  | { type: 'link'; link: Link }
  | null;

interface LinkManagerProps {
  noteSlot?: React.ReactNode;
}

export function LinkManager({ noteSlot }: LinkManagerProps) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [folderModal, setFolderModal] = useState<FolderModal>(null);
  const [linkModal, setLinkModal] = useState<LinkModal>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);

  const currentFolderId = currentPath.at(-1) ?? ROOT_ID;
  const currentFolders = folders.filter((f) => f.parentId === currentFolderId);
  const currentLinks = links.filter((l) => l.folderId === currentFolderId);
  const breadcrumbPath = currentPath.map((id) => ({
    id,
    name: folders.find((f) => f.id === id)?.name ?? '',
  }));
  const isEmpty = currentFolders.length === 0 && currentLinks.length === 0;

  const navigateToIndex = (index: number) => {
    if (index === -1) {
      setCurrentPath([]);
    } else {
      setCurrentPath((p) => p.slice(0, index + 1));
    }
  };

  const handleFolderSave = (name: string) => {
    if (folderModal?.mode === 'create') {
      setFolders((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name,
          parentId: currentFolderId,
          createdAt: new Date().toISOString(),
        },
      ]);
    } else if (folderModal?.mode === 'edit') {
      const id = folderModal.folder.id;
      setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
    }
  };

  const handleFolderDelete = () => {
    if (deleteTarget?.type !== 'folder') return;
    const rootId = deleteTarget.folder.id;

    const getDescendants = (id: string): string[] => {
      const children = folders.filter((f) => f.parentId === id);
      return [id, ...children.flatMap((c) => getDescendants(c.id))];
    };

    const toDelete = new Set(getDescendants(rootId));
    setFolders((prev) => prev.filter((f) => !toDelete.has(f.id)));
    setLinks((prev) => prev.filter((l) => !toDelete.has(l.folderId)));
    if (currentPath.some((id) => toDelete.has(id))) setCurrentPath([]);
  };

  const handleLinkSave = (data: { title?: string; url: string; description?: string }) => {
    if (linkModal?.mode === 'create') {
      setLinks((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          folderId: currentFolderId,
          ...data,
          createdAt: new Date().toISOString(),
        },
      ]);
    } else if (linkModal?.mode === 'edit') {
      const id = linkModal.link.id;
      setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...data } : l)));
    }
  };

  const handleLinkDelete = () => {
    if (deleteTarget?.type !== 'link') return;
    const id = deleteTarget.link.id;
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-2.5">
          <BookMarked size={20} className="text-primary shrink-0" />
          <span className="font-bold text-lg text-gray-900 dark:text-gray-100 tracking-tight">
            fksalink
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Breadcrumbs + toolbar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Breadcrumbs path={breadcrumbPath} onNavigate={navigateToIndex} />
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setFolderModal({ mode: 'create' })}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:border-gray-300 dark:hover:border-neutral-600 transition-colors font-medium shadow-sm"
            >
              <FolderPlus size={15} />
              New Folder
            </button>
            <button
              onClick={() => setLinkModal({ mode: 'create' })}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Link2 size={15} />
              New Link
            </button>
          </div>
        </div>

        {/* Note slot */}
        {noteSlot}

        {/* Folders section */}
        {currentFolders.length > 0 && (
          <section>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              Folders
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-0.5">
              {currentFolders.map((folder) => (
                <FolderItem
                  key={folder.id}
                  folder={folder}
                  onOpen={() => setCurrentPath((p) => [...p, folder.id])}
                  onEdit={() => setFolderModal({ mode: 'edit', folder })}
                  onDelete={() => setDeleteTarget({ type: 'folder', folder })}
                />
              ))}
            </div>
          </section>
        )}

        {/* Links section */}
        {currentLinks.length > 0 && (
          <section>
            {currentFolders.length > 0 && (
              <div className="border-t border-gray-100 dark:border-neutral-800 mb-5" />
            )}
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
              Links
            </p>
            <div className="flex flex-col">
              {currentLinks.map((link) => (
                <LinkItem
                  key={link.id}
                  link={link}
                  onEdit={() => setLinkModal({ mode: 'edit', link })}
                  onDelete={() => setDeleteTarget({ type: 'link', link })}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {isEmpty && (
          <div className="flex-1 flex flex-col items-center justify-center py-28 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
              <BookMarked size={28} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {currentPath.length > 0 ? 'This folder is empty' : 'Nothing here yet'}
            </h3>
            <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs">
              Create a folder to organize your links, or add a link directly here.
            </p>
          </div>
        )}
      </main>

      {/* Modals */}
      {folderModal && (
        <FolderFormModal
          mode={folderModal.mode}
          folder={folderModal.mode === 'edit' ? folderModal.folder : undefined}
          onSave={handleFolderSave}
          onClose={() => setFolderModal(null)}
        />
      )}
      {linkModal && (
        <LinkFormModal
          mode={linkModal.mode}
          link={linkModal.mode === 'edit' ? linkModal.link : undefined}
          onSave={handleLinkSave}
          onClose={() => setLinkModal(null)}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          type={deleteTarget.type}
          name={
            deleteTarget.type === 'folder'
              ? deleteTarget.folder.name
              : deleteTarget.link.title || deleteTarget.link.url
          }
          hasChildren={
            deleteTarget.type === 'folder'
              ? folders.some((f) => f.parentId === deleteTarget.folder.id) ||
                links.some((l) => l.folderId === deleteTarget.folder.id)
              : false
          }
          onConfirm={
            deleteTarget.type === 'folder' ? handleFolderDelete : handleLinkDelete
          }
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
