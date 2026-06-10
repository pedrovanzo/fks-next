'use client';

import { Folder as FolderIcon, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Folder } from '@/app/types';

interface FolderItemProps {
  folder: Folder;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function FolderItem({ folder, onOpen, onEdit, onDelete }: FolderItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center gap-1.5 p-3 rounded-xl cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      {hovered && (
        <div className="absolute top-1.5 right-1.5 flex gap-0.5 z-10">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="p-1 rounded bg-white dark:bg-neutral-800 shadow text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"
            title="Rename"
          >
            <Pencil size={11} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="p-1 rounded bg-white dark:bg-neutral-800 shadow text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            title="Delete"
          >
            <Trash2 size={11} />
          </button>
        </div>
      )}
      <FolderIcon size={44} className="text-amber-400 dark:text-amber-300" strokeWidth={1.5} />
      <span className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium leading-tight w-full truncate text-center">
        {folder.name}
      </span>
    </div>
  );
}
