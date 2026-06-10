'use client';

import { useMemo } from 'react';
import { useNavigation } from '@/app/hooks/useNavigation';
import { useFolders } from '@/app/hooks/useFolders';
import { useSessions } from '@/app/hooks/useSessions';
import { useLinks } from '@/app/hooks/useLinks';
import { useModalState } from '@/app/hooks/useModalState';
import { AppHeader } from './layout/AppHeader';
import { Toolbar } from './ui/Toolbar';
import { EmptyState } from './ui/EmptyState';
import { DeleteConfirmModal } from './ui/DeleteConfirmModal';
import { FolderSection } from './folders/FolderSection';
import { FolderFormModal } from './folders/FolderFormModal';
import { FolderDescription } from './folders/FolderDescription';
import { SessionSection } from './sessions/SessionSection';
import { SessionFormModal } from './sessions/SessionFormModal';
import { LinkSection } from './links/LinkSection';
import { LinkFormModal } from './links/LinkFormModal';

interface LinkManagerProps {
  noteSlot?: React.ReactNode;
}

export function LinkManager({ noteSlot }: LinkManagerProps) {
  const {
    currentPath, currentFolderId, currentSessionId, isInSession,
    navigateInto, openSession, closeSession, navigateToIndex, resetPath,
  } = useNavigation();
  const { folders, createFolder, renameFolder, deleteFolder } = useFolders();
  const { sessions, createSession, renameSession, deleteSession, deleteSessionsInFolders } = useSessions();
  const { links, createLink, updateLink, deleteLink, deleteLinksInFolders, deleteLinksInSessions } = useLinks();
  const {
    folderModal, setFolderModal,
    sessionModal, setSessionModal,
    linkModal, setLinkModal,
    deleteTarget, setDeleteTarget,
  } = useModalState();

  const currentFolders = useMemo(
    () => folders.filter((f) => f.parentId === currentFolderId),
    [folders, currentFolderId],
  );
  const currentSessions = useMemo(
    () => sessions.filter((s) => s.folderId === currentFolderId),
    [sessions, currentFolderId],
  );
  const currentLinks = useMemo(() => {
    if (isInSession) {
      return links.filter((l) => l.parentType === 'session' && l.parentId === currentSessionId);
    }
    return links.filter((l) => l.parentType === 'folder' && l.parentId === currentFolderId);
  }, [links, isInSession, currentSessionId, currentFolderId]);

  const sessionLinkCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const link of links) {
      if (link.parentType === 'session') {
        counts[link.parentId] = (counts[link.parentId] ?? 0) + 1;
      }
    }
    return counts;
  }, [links]);

  const breadcrumbPath = useMemo(
    () => currentPath.map((id) => ({ id, name: folders.find((f) => f.id === id)?.name ?? '' })),
    [currentPath, folders],
  );
  const currentSessionName = useMemo(
    () => currentSessionId ? (sessions.find((s) => s.id === currentSessionId)?.name ?? '') : undefined,
    [currentSessionId, sessions],
  );

  const isEmpty = isInSession
    ? currentLinks.length === 0
    : currentFolders.length === 0 && currentSessions.length === 0 && currentLinks.length === 0;

  const handleFolderSave = (name: string) => {
    if (folderModal?.mode === 'create') {
      createFolder(name, currentFolderId);
    } else if (folderModal?.mode === 'edit') {
      renameFolder(folderModal.folder.id, name);
    }
  };

  const handleFolderDelete = () => {
    if (deleteTarget?.type !== 'folder') return;
    const deletedFolderIds = deleteFolder(deleteTarget.folder.id);
    const deletedSessionIds = deleteSessionsInFolders(deletedFolderIds);
    deleteLinksInFolders(deletedFolderIds);
    deleteLinksInSessions(deletedSessionIds);
    if (currentPath.some((id) => deletedFolderIds.has(id))) resetPath();
    else if (currentSessionId && deletedSessionIds.has(currentSessionId)) closeSession();
  };

  const handleSessionSave = (name: string) => {
    if (sessionModal?.mode === 'create') {
      createSession(name, currentFolderId);
    } else if (sessionModal?.mode === 'edit') {
      renameSession(sessionModal.session.id, name);
    }
  };

  const handleSessionDelete = () => {
    if (deleteTarget?.type !== 'session') return;
    const deletedIds = deleteSession(deleteTarget.session.id);
    deleteLinksInSessions(deletedIds);
    if (currentSessionId && deletedIds.has(currentSessionId)) closeSession();
  };

  const handleLinkSave = (data: { title?: string; url: string; description?: string }) => {
    if (linkModal?.mode === 'create') {
      if (isInSession) {
        createLink(data, 'session', currentSessionId!);
      } else {
        createLink(data, 'folder', currentFolderId);
      }
    } else if (linkModal?.mode === 'edit') {
      updateLink(linkModal.link.id, data);
    }
  };

  const handleLinkDelete = () => {
    if (deleteTarget?.type !== 'link') return;
    deleteLink(deleteTarget.link.id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader
        path={breadcrumbPath}
        onNavigate={navigateToIndex}
        sessionName={currentSessionName}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <FolderDescription />
          {isInSession ? (
            <Toolbar
              context="session"
              onNewLink={() => setLinkModal({ mode: 'create' })}
            />
          ) : (
            <Toolbar
              context="folder"
              onNewFolder={() => setFolderModal({ mode: 'create' })}
              onNewSession={() => setSessionModal({ mode: 'create' })}
              onNewLink={() => setLinkModal({ mode: 'create' })}
            />
          )}
        </div>

        {!isInSession && (
          <>
            {currentFolders.length > 0 && (
              <FolderSection
                folders={currentFolders}
                onOpen={navigateInto}
                onEdit={(folder) => setFolderModal({ mode: 'edit', folder })}
                onDelete={(folder) => setDeleteTarget({ type: 'folder', folder })}
              />
            )}
            {currentSessions.length > 0 && (
              <SessionSection
                sessions={currentSessions}
                linkCounts={sessionLinkCounts}
                hasFolders={currentFolders.length > 0}
                onOpen={openSession}
                onEdit={(session) => setSessionModal({ mode: 'edit', session })}
                onDelete={(session) => setDeleteTarget({ type: 'session', session })}
              />
            )}
            {currentLinks.length > 0 && (
              <LinkSection
                links={currentLinks}
                hasFolders={currentFolders.length > 0 || currentSessions.length > 0}
                onEdit={(link) => setLinkModal({ mode: 'edit', link })}
                onDelete={(link) => setDeleteTarget({ type: 'link', link })}
              />
            )}
          </>
        )}

        {isInSession && currentLinks.length > 0 && (
          <LinkSection
            links={currentLinks}
            hasFolders={false}
            onEdit={(link) => setLinkModal({ mode: 'edit', link })}
            onDelete={(link) => setDeleteTarget({ type: 'link', link })}
          />
        )}

        {isEmpty && (
          <EmptyState
            context={isInSession ? 'session' : 'folder'}
            isNested={currentPath.length > 0}
          />
        )}

        {noteSlot}
      </main>

      {folderModal && (
        <FolderFormModal
          mode={folderModal.mode}
          folder={folderModal.mode === 'edit' ? folderModal.folder : undefined}
          onSave={handleFolderSave}
          onClose={() => setFolderModal(null)}
        />
      )}
      {sessionModal && (
        <SessionFormModal
          mode={sessionModal.mode}
          session={sessionModal.mode === 'edit' ? sessionModal.session : undefined}
          onSave={handleSessionSave}
          onClose={() => setSessionModal(null)}
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
              : deleteTarget.type === 'session'
              ? deleteTarget.session.name
              : deleteTarget.link.title || deleteTarget.link.url
          }
          hasChildren={
            deleteTarget.type === 'folder'
              ? folders.some((f) => f.parentId === deleteTarget.folder.id) ||
                sessions.some((s) => s.folderId === deleteTarget.folder.id) ||
                links.some((l) => l.parentType === 'folder' && l.parentId === deleteTarget.folder.id)
              : deleteTarget.type === 'session'
              ? links.some((l) => l.parentType === 'session' && l.parentId === deleteTarget.session.id)
              : false
          }
          onConfirm={
            deleteTarget.type === 'folder'
              ? handleFolderDelete
              : deleteTarget.type === 'session'
              ? handleSessionDelete
              : handleLinkDelete
          }
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
