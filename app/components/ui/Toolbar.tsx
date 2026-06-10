import { FolderPlus, Link2, Layers } from 'lucide-react';

type FolderToolbarProps = {
  context: 'folder';
  onNewFolder: () => void;
  onNewSession: () => void;
  onNewLink: () => void;
};

type SessionToolbarProps = {
  context: 'session';
  onNewLink: () => void;
};

type ToolbarProps = FolderToolbarProps | SessionToolbarProps;

export function Toolbar(props: ToolbarProps) {
  return (
    <div className="flex gap-2 shrink-0">
      {props.context === 'folder' && (
        <>
          <button
            onClick={props.onNewFolder}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:border-gray-300 dark:hover:border-neutral-600 transition-colors font-medium shadow-sm"
          >
            <FolderPlus size={15} />
            New Folder
          </button>
          <button
            onClick={props.onNewSession}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:border-gray-300 dark:hover:border-neutral-600 transition-colors font-medium shadow-sm"
          >
            <Layers size={15} />
            New Session
          </button>
        </>
      )}
      <button
        onClick={props.onNewLink}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-sm"
      >
        <Link2 size={15} />
        New Link
      </button>
    </div>
  );
}
