import { FolderItem } from './FolderItem';
import type { Folder } from '@/app/types';

interface FolderSectionProps {
  folders: Folder[];
  onOpen: (id: string) => void;
  onEdit: (folder: Folder) => void;
  onDelete: (folder: Folder) => void;
}

export function FolderSection({ folders, onOpen, onEdit, onDelete }: FolderSectionProps) {
  return (
    <section>
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
        Folders
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-0.5">
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            folder={folder}
            onOpen={() => onOpen(folder.id)}
            onEdit={() => onEdit(folder)}
            onDelete={() => onDelete(folder)}
          />
        ))}
      </div>
    </section>
  );
}
